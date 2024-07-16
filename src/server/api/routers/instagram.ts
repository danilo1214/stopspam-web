import { InstagramPage } from "@prisma/client";
import axios from "axios";
import { z } from "zod";
import { Instagram } from "~/server/api/services/instagram";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

type IgPageResult = {
  id: string;
  profile_picture_url: string;
  followers_count: number;
  biography: string;
  username: string;
};

export const instagramRouter = createTRPCRouter({
  getSavedPages: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw Error("No user found");
    }

    const pages = await ctx.db.instagramPage.findMany({
      where: {
        userId: user.id,
      },
    });

    return pages;
  }),

  syncPages: protectedProcedure
    .input(
      z.object({
        pages: z.array(
          z.object({
            id: z.string(),
            profile_picture_url: z.string(),
            followers_count: z.number(),
            biography: z.string(),
            username: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      if (!user) {
        throw Error("No user found");
      }

      const facebookAccount = await ctx.db.facebookAccount.findFirst({
        where: {
          instagramId: ctx.account.providerAccountId,
        },
      });

      if (!facebookAccount) {
        throw Error("No account connected");
      }

      // Initialize map
      const pagesToAddMap: Record<string, IgPageResult> = {};
      input.pages.forEach((page) => {
        pagesToAddMap[page.id] = page;
      });

      // initialize current page map
      const currentPages = await ctx.db.instagramPage.findMany({
        where: { userId: user.id },
      });
      const currentPagesMap: Record<string, InstagramPage> = {};
      currentPages.forEach((page) => {
        currentPagesMap[page.instagramId] = page;
      });

      // create all pages that you should create.
      for (const page of input.pages) {
        if (!currentPagesMap[page.id]) {
          await ctx.db.instagramPage.create({
            data: {
              facebookAccountId: facebookAccount.id,
              instagramId: page.id,
              followers: page.followers_count,
              biography: page.biography,
              username: page.username,
              userId: user.id,
              profilePictureUrl: page.profile_picture_url,
            },
          });
        }
      }

      // delete pages that are not in checklist but present in current list
      for (const page of currentPages) {
        if (!pagesToAddMap[page.instagramId]) {
          await ctx.db.instagramPage.delete({
            where: { id: page.id },
          });
        }
      }

      return true;
    }),

  deletePage: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      if (!user) {
        throw Error("No user found");
      }

      const igPage = await ctx.db.instagramPage.findFirst({
        where: {
          id: input.id,
        },
      });

      if (igPage?.userId !== user.id) {
        throw Error("Access denied");
      }
      await ctx.db.instagramPage.delete({ where: { id: input.id } });
    }),

  connectFacebookPage: protectedProcedure.mutation(async ({ ctx }) => {}),

  getInstagramAccounts: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw Error("No user found");
    }

    const facebookAccount = await ctx.db.facebookAccount.findFirst({
      where: {
        instagramId: ctx.account.providerAccountId,
      },
    });

    if (!facebookAccount) {
      throw Error("No account connected");
    }

    return await new Instagram().getIgPages(facebookAccount);
  }),
});
