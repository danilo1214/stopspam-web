import axios from "axios";
import moment from "moment";
import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env";
import { sendMessageToQueue } from "~/server/aws";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.headers.authorization?.split("Bearer ")[1] === env.CRON_SECRET) {
    const facebookAccounts = await db.facebookAccount.findMany({
      include: {
        account: {
          include: {
            user: {
              include: {
                subscription: true,
              },
            },
          },
        },
      },
    });

    for (const account of facebookAccounts) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const subscription = account.account.user.subscription[0];
      if (!subscription) {
        return;
      }

      // Standard only get once per 4h
      if (
        subscription &&
        subscription.variantId === 436646 &&
        moment().hour() % 4 !== 0
      ) {
        console.log("SKIP FOR STANDARD");
        return;
      }

      const pages = await db.instagramPage.findMany({
        where: {
          facebookAccountId: account.id,
        },
      });

      for (const page of pages) {
        const igPageRes = await axios.get<{ profile_picture_url: string }>(
          `https://graph.facebook.com/v20.0/${page.instagramId}`,
          {
            params: {
              fields: "profile_picture_url",
              access_token: account.long_lived_token,
            },
          },
        );
        const igPage = igPageRes.data;
        console.log(igPage);

        if (igPage.profile_picture_url !== page.profilePictureUrl) {
          await db.instagramPage.update({
            where: { id: page.id },
            data: {
              profilePictureUrl: igPage.profile_picture_url,
            },
          });
        }

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
          const comments: {
            timestamp: string;
            text: string;
            id: string;
            like_count: number;
          }[] =
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            post?.comments?.data ?? [];

          const filteredComments = comments
            .filter((comment) => {
              return moment(comment.timestamp).isAfter(
                moment().subtract(1, "hours"),
              );
            })
            .sort((a, b) => (a.like_count > b.like_count ? -1 : 1))
            .slice(0, 5);
          if (filteredComments && filteredComments.length > 0) {
            await sendMessageToQueue({
              comments: filteredComments,
              instagramPageId: page.instagramId,
              biography: page.biography,
              token: account.long_lived_token,
              profileDescription: page.userDescription,
              goal: page.goal,
              businessType: page.businessType,
              tone: page.vibe,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              media: post,
            });
          }
        }
      }
    }

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}
