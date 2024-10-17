import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import SuperJSON from "superjson";
import { AccountItem } from "~/components/accounts/AccountItem";
import { Dashboard } from "~/components/dashboard/Dashboard";
import { AccessDenied } from "~/components/generic/AccessDenied";
import Button from "~/components/generic/Button";
import { HomeHeader } from "~/components/generic/HomeHeader";
import { Nudge } from "~/components/generic/Nudge";
import { Skeleton } from "~/components/generic/Skeleton";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { authOptions } from "~/server/auth";
import { helpers } from "~/server/helpers";

import { api } from "~/utils/api";

export default function Home() {
  const { data: subscription, isLoading: isSubscriptionLoading } =
    api.subscriptions.getCurrent.useQuery({});
  const { data: pages, isLoading: isPagesLoading } =
    api.instagram.getSavedPages.useQuery();
  const { data: sessionData, status } = useSession();
  const { data: account, isLoading: isAccountLoading } =
    api.instagram.getFacebookAccount.useQuery(undefined, {
      enabled: !!sessionData?.user,
    });

  const { mutate } = api.cronRouter.job.useMutation();

  const isLoading = isAccountLoading || isPagesLoading || isSubscriptionLoading;

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  if (!subscription) {
    return <CTABanner />;
  }

  if (!account) {
    return (
      <Nudge
        title="You don't have a business account yet"
        description="Connect Business Account"
        link="/connect"
      />
    );
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
          pages={pages?.length ?? 0}
          name={sessionData?.user.name ?? ""}
        />

        <Button label="kur" onClick={() => mutate({ secret: "123" })} />

        <Dashboard />

        <div>
          <div className="my-5 text-lg">Your connected pages</div>
          {(!pages || pages.length === 0) && (
            <Nudge
              link="/connect"
              title="You don't have any connected Instagram profiles yet."
              description="Connect"
            />
          )}
          {pages?.map((p, idx) => <AccountItem key={idx} instagramPage={p} />)}
        </div>
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
