import { PrismaAdapter } from "@auth/prisma-adapter";
import axios from "axios";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import FacebookProvider from "next-auth/providers/facebook";

import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account }) {
      if (user && account) {
        try {
          const userFromDatabase = await db.user.findFirst({
            where: { id: user.id },
          });
          if (userFromDatabase) {
            // todo:
            // 1. generate long lived token
            const res = await axios.get(
              `https://graph.facebook.com/v20.0/oauth/access_token`,
              {
                params: {
                  grant_type: "fb_exchange_token",
                  client_id: env.FACEBOOK_CLIENT_ID,
                  client_secret: env.FACEBOOK_CLIENT_SECRET,
                  fb_exchange_token: account.access_token,
                },
              },
            );

            console.log("GOT REZ, KRIEJT AKAUNT");

            await db.instagramAccount.create({
              data: {
                long_lived_token: res.data.access_token as string,
                instagramId: account.providerAccountId,
                userId: userFromDatabase.id,
              },
            });

            console.log("akaunt apdejted");
            // 2. store long lived token on new ig table
            // 3. store all shitz such as pages and stuff in ig table.
          }
        } catch (err) {
          if (err instanceof Error) {
            console.error(err.message);
          }
        }
      }

      return true;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement",
        },
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
