import { useSession } from "next-auth/react";
import Head from "next/head";
import { AccountItem } from "~/components/accounts/AccountItem";
import { Dashboard } from "~/components/dashboard/Dashboard";
import { AccessDenied } from "~/components/generic/AccessDenied";
import { HomeHeader } from "~/components/generic/HomeHeader";
import { Nudge } from "~/components/generic/Nudge";
import { Skeleton } from "~/components/generic/Skeleton";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";

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

  const isLoading = isAccountLoading || isPagesLoading || isSubscriptionLoading;

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  if (subscription) {
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

        <Dashboard />

        <div>
          <div className="my-5 text-lg">Your connected pages</div>
          {(!pages || pages.length === 0) && (
            <Nudge
              link="/connect"
              title="You don't have any connected Instagram pages yet."
              description="Connect"
            />
          )}
          {pages?.map((p) => <AccountItem instagramPage={p} />)}
        </div>
      </main>
    </>
  );
}
