import { InstagramAccount } from "@prisma/client";
import axios, { AxiosInstance } from "axios";

export type IgPageResult = {
  id: string;
  profile_picture_url: string;
  followers_count: number;
  biography: string;
  username: string;
};

export class Instagram {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://graph.facebook.com/v20.0",
    });
  }

  async getIgPages(account: InstagramAccount): Promise<IgPageResult[]> {
    const res = await this.instance.get(
      `/me/accounts?access_token=${account.long_lived_token}`,
    );
    const pages = res.data.data as any[];

    let igPages = [];

    for (const page of pages) {
      try {
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
      } catch (err: any) {
        console.log(err.response.data);
      }
    }

    return igPages as IgPageResult[];
  }
}
