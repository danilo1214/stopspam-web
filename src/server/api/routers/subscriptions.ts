import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { lemonSqueezyApi } from "~/server/lemonsqueezy";
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

    await db.user.delete({
      where: { id: user.id },
    });
    return { message: "Account deleted successfully" };
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
