import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  batching: {
    enabled: false,
  },
  responseMeta(opts) {
    const { info, errors, type } = opts;
    const allInstagram = info?.calls.every((call) =>
      ["getFacebookUnconnectedPages", "getInstagramAccounts "].includes(
        call.path,
      ),
    );
    // checking that no procedures errored
    const allOk = errors.length === 0;
    // checking we're doing a query request
    const isQuery = type === "query";

    if (allInstagram && allOk && isQuery) {
      // cache request for 1 day + revalidate once every second
      const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
      return {
        headers: new Headers([
          [
            "cache-control",
            `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
          ],
        ]),
      };
    }
    return {};
  },
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
