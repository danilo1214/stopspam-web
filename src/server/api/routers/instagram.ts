import { InstagramPageType, type InstagramPage } from "@prisma/client";
import { z } from "zod";
import { env } from "~/env";
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
    const pages = await ctx.db.instagramPage.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return pages;
  }),

  getSavedPage: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const page = await ctx.db.instagramPage.findUnique({
        where: {
          id: Number(input),
        },
        include: {
          demoReplies: true,
        },
      });

      if (!page) {
        throw Error("Not found");
      }

      if (page.userId !== ctx.session.user.id) {
        throw Error("Access denied");
      }

      return page;
    }),

  updatePage: protectedProcedure
    .input(
      z.object({
        paused: z.boolean().optional(),
        type: z
          .enum([InstagramPageType.BUSINESS, InstagramPageType.CREATOR])
          .optional(),
        goal: z.string().optional(),
        id: z.string(),
        subType: z.string().optional(),
        description: z.string().optional(),
        vibe: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      const page = await ctx.db.instagramPage.findUnique({
        where: {
          id: Number(input.id),
        },
      });

      if (!page) {
        throw Error("Not found");
      }

      if (page.userId !== user.id) {
        throw Error("Access denied");
      }

      const update: Partial<InstagramPage> = {};

      if (input.vibe) {
        update.vibe = input.vibe;
      }

      if (input.goal) {
        update.goal = input.goal;
      }

      if (input.paused !== undefined) {
        update.paused = input.paused;
      }

      if (input.description) {
        update.userDescription = input.description;
      }

      if (input.subType) {
        update.subType = input.subType;
      }

      if (input.type) {
        update.type = input.type;
      }

      console.log(update);

      await ctx.db.instagramPage.update({
        where: {
          id: Number(input.id),
        },
        data: update,
      });
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

  getFacebookAccount: protectedProcedure.query(async ({ ctx }) => {
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

    return facebookAccount;
  }),

  getFacebookUnconnectedPages: protectedProcedure.query(async ({ ctx }) => {
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

    return await new Instagram().getFbPages(facebookAccount);
  }),

  scheduleCron: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.account.id === "cmajowjr900024ouo14jnrqhz") {
      await new Instagram().replyToComments();
    } else {
      throw Error("No authorized");
    }
  }),

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
