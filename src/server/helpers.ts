import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

export const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: createInnerTRPCContext({ session: null }),
  transformer: superjson, // optional - adds superjson serialization
});
