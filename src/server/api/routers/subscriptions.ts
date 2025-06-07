import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { stripe } from "~/server/stripe";

export const subscriptionRouter = createTRPCRouter({
  getCurrent: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw Error("No user found");
    }

    const sub = await ctx.db.subscription.findFirst({
      where: {
        userId: user.id,
      },
    });

    return sub;
  }),

  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx.session;

    const account = await db.account.findFirst({
      where: {
        userId: user.id,
      },
    });

    await db.facebookAccount.delete({
      where: {
        instagramId: account?.providerAccountId,
      },
    });

    const sub = await ctx.db.subscription.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (sub) {
      await stripe.subscriptions.cancel(sub.subscriptionId!);
    }

    await db.user.delete({
      where: { id: user.id },
    });

    return { message: "Account deleted successfully" };
  }),

  getProrationPreview: protectedProcedure
    .input(
      z.object({
        newPriceId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.session.user;
      if (!user) {
        throw new Error("No user");
      }

      const sub = await ctx.db.subscription.findFirst({
        where: { userId: user.id },
      });

      if (!sub?.subscriptionId) {
        throw new Error("No active subscription");
      }

      const stripeSub = await stripe.subscriptions.retrieve(sub.subscriptionId);

      const currentItem = stripeSub.items.data[0];
      if (!currentItem) {
        throw new Error("No subscription item found");
      }

      const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
        customer: stripeSub.customer as string,
        subscription: sub.subscriptionId,
        subscription_items: [
          {
            id: currentItem.id,
            price: input.newPriceId, // new price
          },
        ],
        subscription_trial_end: "now",
        subscription_billing_cycle_anchor: "now",
        subscription_proration_behavior: "create_prorations",
      });

      return {
        amountDue: upcomingInvoice.subtotal,
        currency: upcomingInvoice.currency,
        nextBillingDate: upcomingInvoice.next_payment_attempt
          ? new Date(upcomingInvoice.next_payment_attempt * 1000).toISOString()
          : null,
      };
    }),

  changeSubscriptionProduct: protectedProcedure
    .input(
      z.object({
        newPriceId: z.string(), // Price ID of the new product
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      if (!user) {
        throw new Error("No user");
      }

      const sub = await ctx.db.subscription.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!sub?.subscriptionId) {
        throw new Error("No active subscription found");
      }

      // Get the current subscription to find the item to replace
      const stripeSub = await stripe.subscriptions.retrieve(sub.subscriptionId);
      const currentItemId = stripeSub.items.data[0]?.id;

      if (!currentItemId) {
        throw new Error("Current subscription item not found");
      }

      // Replace the subscription item with the new price
      try {
        const updatedSub = await stripe.subscriptions.update(
          sub.subscriptionId,
          {
            items: [
              {
                id: currentItemId,
                price: input.newPriceId,
              },
            ],
            billing_cycle_anchor: "now",
            proration_behavior: "create_prorations", // You can change to "none" if needed
          },
        );

        return {
          success: true,
          message: "Subscription updated to new product.",
          updatedSubscription: updatedSub,
        };
      } catch (error) {
        console.error("Failed to change subscription product:", error);
        throw error;
      }
    }),

  resumeSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw Error("no user");
    }

    const sub = await ctx.db.subscription.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (!sub?.subscriptionId) {
      throw Error("No subscription found");
    }

    try {
      await stripe.subscriptions.update(sub.subscriptionId, {
        cancel_at_period_end: false,
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  }),

  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw Error("no user");
    }

    const sub = await ctx.db.subscription.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (!sub?.subscriptionId) {
      throw Error("No subscription found");
    }

    try {
      await stripe.subscriptions.update(sub.subscriptionId, {
        cancel_at_period_end: true,
      });
      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
