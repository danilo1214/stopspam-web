import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import axios from "axios";
import moment from "moment";
import { sendMessageToQueue } from "~/server/aws";

export const cronRouter = createTRPCRouter({
  job: publicProcedure
    .input(z.object({ secret: z.string() }))
    .mutation(async ({ input }) => {
      // This will obviously be an .env variable later
      if (input.secret === "123") {
        const facebookAccounts = await db.facebookAccount.findMany();
        for (const account of facebookAccounts) {
          const pages = await db.instagramPage.findMany({
            where: {
              facebookAccountId: account.id,
            },
          });

          for (const page of pages) {
            const mediaRes = await axios.get(
              `https://graph.facebook.com/v20.0/${page.instagramId}/media`,
              {
                params: {
                  fields: "caption,comments{like_count,timestamp,text}",
                  access_token: account.long_lived_token,
                },
              },
            );

            // Only reply comment last 5 posts
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const posts = mediaRes.data.data.slice(0, 5);
            for (const post of posts) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const comments:
                | {
                    timestamp: string;
                    text: string;
                    id: string;
                    like_count: number;
                  }[]
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                | undefined = post?.comments?.data;
              if (comments && comments.length > 0) {
                const filteredComments = comments
                  .filter((comment) => {
                    return moment(comment.timestamp).isAfter(
                      moment().subtract(1, "hours"),
                    );
                  })
                  .sort((a, b) => (a.like_count > b.like_count ? -1 : 1))
                  .slice(0, 5);

                await sendMessageToQueue({
                  comments: filteredComments,
                  instagramPageId: page.instagramId,
                  desc: page.biography,
                  token: account.long_lived_token,
                  profileDescription: page.userDescription,
                  goal: page.goal,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  media: post,
                });
              }
            }
          }
        }
      }
    }),
});
