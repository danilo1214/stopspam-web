import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lemonSqueezyApi } from "~/server/lemonsqueezy";

export const paymentRouter = createTRPCRouter({
  checkout: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<string> => {
      try {
        const response = await lemonSqueezyApi.post("/checkouts", {
          data: {
            type: "checkouts",
            attributes: {
              checkout_data: {
                custom: {
                  user_id: ctx.session.user.id,
                },
              },
              product_options: {
                redirect_url: "http://localhost:3000",
              },
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: env.LEMONSQUEEZY_STORE_ID,
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: input.productId,
                },
              },
            },
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const url: string | undefined = response?.data?.data?.attributes
          .url as string;
        return url;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }),
  cancel: protectedProcedure
    .input(
      z.object({
        subscriptionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<string> => {
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
