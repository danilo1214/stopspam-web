import { PlusIcon } from "@heroicons/react/24/outline";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import SuperJSON from "superjson";
import { AccountList } from "~/components/accounts/AccountList";
import { Dashboard } from "~/components/dashboard/Dashboard";
import { AccessDenied } from "~/components/generic/AccessDenied";
import { HomeHeader } from "~/components/generic/HomeHeader";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";
import { useMeta } from "~/hooks/useMeta";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { authOptions } from "~/server/auth";

import { api } from "~/utils/api";

export default function Home() {
  /**
   * Queries
   */
  const { data: subscription } = api.subscriptions.getCurrent.useQuery({});
  const { data: sessionData, status } = useSession();
  const { savedPages } = useMeta();

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  if (!subscription) {
    return <CTABanner />;
  }

  return (
    <>
      <Head>
        <title>Instagram admin manager</title>
        <meta name="description" content="Keyyy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-y-10 px-10">
        <HomeHeader
          pages={savedPages?.length ?? 0}
          name={sessionData?.user.name ?? ""}
        />

        <Dashboard />

        <AccountList />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: SuperJSON,
  });

  // Run all three fetch operations in parallel
  await Promise.all([
    helpers.subscriptions.getCurrent.fetch({}, { context }),
    helpers.instagram.getSavedPages.fetch(undefined, { context }),
    helpers.instagram.getFacebookAccount.fetch(undefined, { context }),
  ]);

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
