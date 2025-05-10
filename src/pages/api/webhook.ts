import { type NextApiRequest, type NextApiResponse } from "next";
import { buffer } from "stream/consumers";
import type Stripe from "stripe";
import { env } from "~/env";
import { db } from "~/server/db";
import { stripe } from "~/server/stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    console.log("hiiii");
    if (req.method === "POST") {
      const sig = req.headers["stripe-signature"] as string;
      console.log(sig);

      let event: Stripe.Event;

      const raw = await buffer(req);

      try {
        event = stripe.webhooks.constructEvent(
          raw,
          sig,
          env.STRIPE_WEBHOOK_SECRET,
        );
      } catch (err: any) {
        console.log(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      switch (event.type) {
        case "checkout.session.completed":
          const metadata = event.data.object.metadata;

          if (!metadata) {
            return res.status(500).end();
          }

          const existingSub = await db.subscription.findFirst({
            where: {
              userId: metadata.user_id!,
            },
          });

          if (existingSub) {
            await db.subscription.delete({
              where: {
                id: existingSub.id,
              },
            });
          }

          const customer = event.data.object.customer;
          if (!customer) {
            return res.status(400).end();
          }
          const createdCustomerId =
            typeof customer === "string" ? customer : customer.id;

          const subscription = event.data.object.subscription;
          if (!subscription) {
            return res.status(400).end();
          }
          const subscriptionId =
            typeof subscription === "string" ? subscription : subscription.id;

          const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
          const createdProductId = stripeSub.items.data[0]?.plan.id;

          await db.subscription.create({
            data: {
              status: "active",
              expires: new Date(),
              userId: metadata.user_id!,
              customerId: createdCustomerId,
              subscriptionId,
              productId: createdProductId,
            },
          });
          return res.status(200).end();
        case "customer.subscription.deleted": {
          const sub = event.data.object;
          const existingSub = await db.subscription.findFirst({
            where: {
              subscriptionId: sub.id,
            },
          });

          if (!existingSub) {
            res.status(500).end();
          }

          await db.subscription.update({
            where: {
              id: existingSub?.id,
            },
            data: {
              status: "cancelled",
            },
          });
        }
        case "customer.subscription.resumed": {
          const sub = event.data.object;
          const existingSub = await db.subscription.findFirst({
            where: {
              subscriptionId: sub.id,
            },
          });

          if (!existingSub) {
            res.status(500).end();
          }

          await db.subscription.update({
            where: {
              id: existingSub?.id,
            },
            data: {
              status: "active",
            },
          });

          break;
        }
        case "customer.subscription.updated":
          const updatedSubscription = event.data.object;

          const productId = updatedSubscription.items.data[0]?.plan.id;

          const customerId =
            typeof updatedSubscription.customer === "string"
              ? updatedSubscription.customer
              : updatedSubscription.customer.id;

          const existingSubscription = await db.subscription.findFirst({
            where: {
              customerId,
            },
          });

          if (!existingSubscription) {
            res.status(200).end();
          }

          await db.subscription.update({
            where: {
              id: existingSubscription?.id,
            },
            data: {
              productId: productId,
              subscriptionId: updatedSubscription.id,
              status: updatedSubscription.status as string,
              expires: new Date(updatedSubscription.current_period_end * 1000),
            },
          });
          res.status(200).end();
        default:
          console.log("Unexpected webhook type", JSON.stringify(event));
      }
      return res.status(200).end();
    }
  } catch (err) {
    console.log(err);
  }
}
