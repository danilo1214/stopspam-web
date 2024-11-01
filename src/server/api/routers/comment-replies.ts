import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const commentRepliesRouter = createTRPCRouter({
  getCommentRepliesCount: protectedProcedure.query(async ({ ctx }) => {
    const count = await db.commentReply.count({
      where: {
        userId: ctx.account.userId,
      },
    });

    return count;
  }),
});
