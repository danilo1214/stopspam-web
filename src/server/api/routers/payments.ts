import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { stripe } from "~/server/stripe";

interface AxiosErr {
  response: { data: unknown };
}
export const paymentRouter = createTRPCRouter({
  checkout: protectedProcedure
    .input(
      z.object({
        trialDays: z.number().optional(),
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<string> => {
      const user = ctx.session.user;
      if (!user) {
        throw Error("No user found");
      }

      const sub = await ctx.db.subscription.findFirst({
        where: {
          userId: user.id,
        },
      });

      const shouldDiscount = !sub;

      try {
        const successUrl =
          env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://app.reply-master.com";

        const response = await stripe.checkout.sessions.create({
          line_items: [{ price: input.productId, quantity: 1 }],
          metadata: {
            user_id: ctx.account.userId,
          },
          ...(shouldDiscount
            ? {
                discounts: [
                  {
                    promotion_code: "promo_1Reuv81NldzrbHx54CUrKdXU",
                  },
                ],
              }
            : {}),
          payment_method_types: ["card"],
          mode: "subscription",
          success_url: successUrl,
          cancel_url: successUrl,
          ...(input.trialDays
            ? {
                subscription_data: {
                  trial_period_days: input.trialDays,
                },
              }
            : {}),
        });

        await stripe.customers.create({});

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const url = response.url!;
        return url;
      } catch (err: unknown) {
        console.log(err);
        const e = err as AxiosErr;
        throw err;
      }
    }),
});
