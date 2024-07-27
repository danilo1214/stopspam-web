import { useSession } from "next-auth/react";
import Head from "next/head";
import { AccountItem } from "~/components/accounts/AccountItem";
import { Dashboard } from "~/components/dashboard/Dashboard";
import { HomeHeader } from "~/components/generic/HomeHeader";
import { Nudge } from "~/components/generic/Nudge";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";

import { api } from "~/utils/api";

export default function Home() {
  const { data: subscription } = api.subscriptions.getCurrent.useQuery({});
  const { data: pages } = api.instagram.getSavedPages.useQuery();
  const { data: account } = api.instagram.getFacebookAccount.useQuery();
  const { data: sessionData } = useSession();

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
          <div className="mb-10 text-lg font-semibold">
            Your connected pages
          </div>
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
