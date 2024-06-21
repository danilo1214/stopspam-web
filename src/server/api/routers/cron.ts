import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import axios from "axios";

export const cronRouter = createTRPCRouter({
  job: publicProcedure
    .input(z.object({ secret: z.string() }))
    .mutation(async ({ input }) => {
      if (input.secret === "123") {
        //ok

        const instaAccounts = await db.instagramAccount.findMany();
        for (const account of instaAccounts) {
          console.log("geting");
          const res = await axios.get(
            `https://graph.facebook.com/v20.0/me/accounts?access_token=${account.long_lived_token}`,
          );

          console.log(res.data);

          const pages = res.data.data as any[];

          for (const page of pages) {
            console.log(page.name);
            const accRes = await axios.get(
              `https://graph.facebook.com/v20.0/${page.id}`,
              {
                params: {
                  fields: "instagram_business_account",
                  access_token: account.long_lived_token,
                },
              },
            );

            const pageData = accRes.data;

            if (pageData.instagram_business_account?.id) {
              console.log(`media for ${page.id}`);
              const media = await axios.get(
                `https://graph.facebook.com/v20.0/${pageData.instagram_business_account.id}/media?access_token=${account.long_lived_token}`,
              );

              console.log(media.data);
            }
          }
        }
      }
    }),
});
