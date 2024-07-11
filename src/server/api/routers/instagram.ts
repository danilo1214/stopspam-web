import axios from "axios";
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
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw Error("No user found");
    }

    const igAccount = await ctx.db.instagramAccount.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!igAccount) {
      throw Error("No account connected");
    }

    return await new Instagram().getIgPages(igAccount);
  }),
});
