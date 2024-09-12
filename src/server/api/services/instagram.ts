/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FacebookAccount } from "@prisma/client";
import axios, { type AxiosError, type AxiosInstance } from "axios";

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
}
