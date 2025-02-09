import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lemonSqueezyApi } from "~/server/lemonsqueezy";
import { stripe } from "~/server/stripe";

interface AxiosErr {
  response: { data: unknown };
}
export const paymentRouter = createTRPCRouter({
  checkout: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<string> => {
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
          payment_method_types: ["card"],
          mode: "subscription",
          success_url: successUrl,
          cancel_url: successUrl,
          allow_promotion_codes: true,
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
  cancel: protectedProcedure
    .input(
      z.object({
        subscriptionId: z.string(),
      }),
    )
    .mutation(async ({ input }): Promise<string> => {
      try {
        const response = await lemonSqueezyApi.delete(
          `/subscriptions${input.subscriptionId}`,
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const url: string | undefined = response?.data?.data?.attributes
          .url as string;
        return url;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }),
});
