/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type InstagramPage, type FacebookAccount } from "@prisma/client";
import axios, { type AxiosError, type AxiosInstance } from "axios";

const n = 50;

export type IgComment = {
  timestamp: string;
  text: string;
  id: string;
  like_count: number;
};

export type IgCommentInfo = IgComment & {
  handle: string;
  media_id: string;
  instagram_page_id: string;
  media_text: string;
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
          fields: "caption,comments{like_count,timestamp,text},permalink",
          access_token: account.long_lived_token,
        },
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const posts = mediaRes.data.data.slice(0, 10);

    let jointComments: IgCommentInfo[] = [];

    for (const post of posts) {
      const comments: IgComment[] = post?.comments?.data ?? [];
      const allowed = n - comments.length;

      const splitUrl = (post?.permalink as string)?.split("/");
      const mediaId = splitUrl?.[splitUrl.length - 2];

      jointComments = jointComments.concat(
        comments.slice(0, allowed).map((comment) => ({
          ...comment,
          handle: "",
          instagram_page_id: page.id.toString(),
          media_id: mediaId!,
          media_text: post.caption,
        })),
      );
    }

    return jointComments;
  }
}
