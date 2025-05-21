/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type InstagramPage, type FacebookAccount } from "@prisma/client";
import axios, { type AxiosError, type AxiosInstance } from "axios";
import moment from "moment";
import { sendMessageToQueue } from "~/server/aws";
import { db } from "~/server/db";

const n = 50;

export type IgComment = {
  timestamp: string;
  text: string;
  id: string;
  like_count: number;
  username: string;
};

export type IgCommentInfo = IgComment & {
  handle: string;
  media_id: string;
  instagram_page_id: string;
  post_caption: string;
  post_url: string;
};

export type IgPageResult = {
  id: string;
  profile_picture_url: string;
  followers_count: number;
  biography: string;
  username: string;
};

export type FbPageResult = {
  id: string;
  name: string;
};

export class Instagram {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://graph.facebook.com/v20.0",
    });
  }

  async getFbPages(account: FacebookAccount): Promise<FbPageResult[]> {
    const fbPages = [];
    try {
      const res = await this.instance.get(
        `/me/accounts?access_token=${account.long_lived_token}`,
      );
      const pages = res.data.data as any[];

      for (const page of pages) {
        const businessAccountRes = await this.instance.get(`/${page.id}`, {
          params: {
            fields: "instagram_business_account,name",
            access_token: account.long_lived_token,
          },
        });
        const pageData = businessAccountRes.data;

        if (!pageData.instagram_business_account?.id) {
          fbPages.push(pageData);
        }
      }
    } catch (err) {
      console.log((err as AxiosError).response?.data);
    }

    return fbPages;
  }

  async getIgPages(account: FacebookAccount): Promise<IgPageResult[]> {
    const igPages = [];
    try {
      const res = await this.instance.get(
        `/me/accounts?access_token=${account.long_lived_token}`,
      );
      const pages = res.data.data as any[];

      for (const page of pages) {
        const businessAccountRes = await this.instance.get(`/${page.id}`, {
          params: {
            fields: "instagram_business_account",
            access_token: account.long_lived_token,
          },
        });
        const pageData = businessAccountRes.data;

        if (pageData.instagram_business_account?.id) {
          const igId = pageData.instagram_business_account?.id;
          const igPageDataRes = await this.instance.get(`/${igId}`, {
            params: {
              fields:
                "id,profile_picture_url,followers_count,biography,username",
              access_token: account.long_lived_token,
            },
          });

          igPages.push(igPageDataRes.data);
        }
      }
    } catch (err) {
      console.log((err as AxiosError).response?.data);
    }

    return igPages.map((page) => ({
      ...page,
      biography: page.biography ?? "",
      profile_picture_url: page.profile_picture_url ?? "",
    })) as IgPageResult[];
  }

  async getLastNComments(
    account: FacebookAccount,
    page: InstagramPage,
    n = 50,
  ): Promise<IgCommentInfo[]> {
    const mediaRes = await axios.get(
      `https://graph.facebook.com/v20.0/${page.instagramId}/media`,
      {
        params: {
          fields:
            "caption,comments{like_count,timestamp,text,username},permalink,media_url,thumbnail_url",
          access_token: account.long_lived_token,
        },
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const posts = mediaRes.data.data.slice(0, 10);

    let jointComments: IgCommentInfo[] = [];

    for (const post of posts) {
      console.log(post);
      const comments: IgComment[] = post?.comments?.data ?? [];
      const allowed = n - comments.length;

      const splitUrl = (post?.permalink as string)?.split("/");
      const mediaId = splitUrl?.[splitUrl.length - 2];

      jointComments = jointComments.concat(
        comments.slice(0, allowed).map((comment) => ({
          ...comment,
          handle: comment.username,
          instagram_page_id: page.id.toString(),
          media_id: mediaId!,
          post_url: post.media_url,
          post_caption: post.caption,
        })),
      );
    }

    return jointComments;
  }

  async replyToComments() {
    const facebookAccounts = await db.facebookAccount.findMany();

    console.log(`Got ${facebookAccounts.length} accs`);

    for (const account of facebookAccounts) {
      console.log("merging for " + account.instagramId);
      const acc = await db.account.findFirst({
        where: {
          providerAccountId: account.instagramId,
        },
        include: {
          user: {
            include: {
              subscription: true,
            },
          },
        },
      });

      if (!acc) {
        console.log("no account found with id " + account.instagramId);
        continue;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const subscription = acc.user.subscription[0];
      if (!subscription) {
        console.log("no subscription found for " + account.instagramId);
        continue;
      }

      // Standard only get once per 4h
      /**
      *  if (
        subscription &&
        subscription.variantId === 436646 &&
        moment().hour() % 4 !== 0
      ) {
        console.log("SKIP FOR STANDARD");
        return;
      }
      */

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

        // in last 2 weeks?

        // TODO: LIMIT ONLY 10 COMMS PER POST

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

          console.log(comments);

          const filteredComments = comments
            .filter((comment) => {
              return moment(comment.timestamp).isAfter(
                moment().subtract(1, "hours"),
              );
            })
            .sort((a, b) => (a.like_count > b.like_count ? -1 : 1))
            .slice(0, 5);

          console.log(filteredComments);

          console.log(filteredComments.length);
          for (const comment of filteredComments) {
            //
            await db.commentReply.create({
              data: {
                userId: acc.userId,
                instagramId: comment.id,
                text: comment.text,
              },
            });
          }

          console.log("ok get");

          if (filteredComments && filteredComments.length > 0) {
            console.log("will post lambda");
            await sendMessageToQueue({
              caption: post.caption,
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
  }
}
