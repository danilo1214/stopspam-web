import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { paymentRouter } from "./routers/payments";
import { subscriptionRouter } from "./routers/subscriptions";
import { instagramRouter } from "~/server/api/routers/instagram";
import { commentRepliesRouter } from "~/server/api/routers/comment-replies";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  payments: paymentRouter,
  subscriptions: subscriptionRouter,
  instagram: instagramRouter,
  commentReplies: commentRepliesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
