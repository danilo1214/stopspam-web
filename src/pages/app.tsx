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

  return (
    <>
      <Head>
        <title>
          Reply Master Dashboard | Manage Your Instagram and Facebook Engagement
        </title>
        <meta
          name="description"
          content="Access your Reply Master dashboard to manage your Instagram and Facebook comment responses. Monitor subscriptions, accounts, and page activity all in one place."
        />
        <meta
          name="keywords"
          content="Reply Master dashboard, Instagram management, Facebook management, social media automation, comment replies, customer engagement, subscription management"
        />
        <meta
          property="og:title"
          content="Reply Master Dashboard | Manage Your Social Media Engagement"
        />
        <meta
          property="og:description"
          content="Manage your Instagram and Facebook comment replies and track engagement directly from the Reply Master dashboard."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col gap-y-10 px-4 lg:px-10">
        <HomeHeader
          pages={savedPages?.length ?? 0}
          name={sessionData?.user.name ?? ""}
        />

        <Dashboard />

        <AccountList hasSubscription={!!subscription} />

        {!subscription && <CTABanner />}
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/get-started",
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
