import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import SuperJSON from "superjson";
import { PricingList } from "~/components/pricing/PricingList";
import { cards } from "~/const";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { authOptions } from "~/server/auth";

export default function Pricing() {
  return (
    <div>
      <PricingList cards={cards} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: SuperJSON,
  });

  await Promise.all([helpers.subscriptions.getCurrent.fetch({}, { context })]);

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
