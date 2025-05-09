import { z } from "zod";
import { Instagram } from "~/server/api/services/instagram";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { sendMessageToQueue } from "~/server/aws";
import { db } from "~/server/db";

export const commentRepliesRouter = createTRPCRouter({
  triggerDemo: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const page = await db.instagramPage.findFirst({
        where: {
          id: input,
        },
        include: {
          facebookAccount: true,
        },
      });

      if (!page) {
        throw new Error("Instagram page not found");
      }

      const comments = await new Instagram().getLastNComments(
        page.facebookAccount,
        page,
      );

      await sendMessageToQueue({
        comments,
        instagramPageId: page.instagramId,
        biography: page.biography,
        token: page.facebookAccount.long_lived_token,
        profileDescription: page.userDescription,
        goal: page.goal,
        businessType: page.businessType,
        tone: page.vibe,
      });

      await db.instagramPage.update({
        where: {
          id: input,
        },
        data: {
          hasDemoed: true,
        },
      });

      return true;
    }),
  getCommentRepliesCount: protectedProcedure.query(async ({ ctx }) => {
    const count = await db.commentReply.count({
      where: {
        userId: ctx.account.userId,
      },
    });

    return count;
  }),
});
