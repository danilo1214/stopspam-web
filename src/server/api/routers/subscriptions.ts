import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { lemonSqueezyApi } from "~/server/lemonsqueezy";

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
    if (!sub) {
      throw Error("No subscription found");
    }

    try {
      const response = await lemonSqueezyApi.patch(
        `/subscriptions/${sub.subscriptionId}`,
        {
          data: {
            type: "subscriptions",
            id: `${sub.subscriptionId}`,
            attributes: {
              cancelled: false,
            },
          },
        },
      );

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
    if (!sub) {
      throw Error("No subscription found");
    }

    const response = await lemonSqueezyApi.delete(
      `/subscriptions/${sub.subscriptionId}`,
    );

    return true;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
