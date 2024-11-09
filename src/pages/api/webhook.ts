/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";
import crypto from "crypto";
import { env } from "~/env";

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST") {
      return res.status(405);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const b: Buffer = await buffer(req);

    const secret = env.LEMONSQUEEZY_WEBHOOK_SECRET;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(b.toString()).digest("hex"),
      "utf8",
    ).toString();
    const signature = req.headers["x-signature"];

    if (signature !== digest) {
      res.status(401).end();
      return;
    }

    // Example of processing a webhook event
    const event: any = JSON.parse(b.toString()) as object;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (event.meta.event_name as string) {
      case "subscription_updated":
        const sub = await db.subscription.findFirst({
          where: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            subscriptionId: event.data.id as string,
          },
        });
        if (!sub) {
          res.status(200);
        }
        await db.subscription.update({
          where: {
            id: sub?.id,
          },
          data: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            status: event.data.attributes.status as string,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            expires: new Date(event.data.attributes.renews_at as string),
          },
        });
        res.status(200).end();

      case "subscription_created":
        const existingSub = await db.subscription.findFirst({
          where: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            userId: event.meta.custom_data.user_id as string,
          },
        });

        if (existingSub) {
          await db.subscription.delete({
            where: {
              id: existingSub.id,
            },
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        await db.subscription.create({
          data: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            status: event.data.attributes.status as string,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            expires: new Date(event.data.attributes.renews_at as string),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            userId: event.meta.custom_data.user_id as string,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            subscriptionId: event.data.id as string,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            variantId: event.data.attributes.variant_id as number,
          },
        });
        res.status(200).end();
        return;
      // Handle subscription creation
      case "subscription.updated":
        // Handle subscription updates
        break;
      // Add more cases as needed
    }

    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
}

export const config = { api: { bodyParser: false } };
