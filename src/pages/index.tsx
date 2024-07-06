import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";

import { api } from "~/utils/api";

export default function Home() {
  const { data: subscription, isLoading: isSubscriptionLoading } =
    api.subscriptions.getCurrent.useQuery({});

  return (
    <>
      <Head>
        <title>Instagram admin manager</title>
        <meta name="description" content="Keyyy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!isSubscriptionLoading && !subscription && (
          <div className="mx-10">
            <CTABanner />
          </div>
        )}
      </main>
    </>
  );
}
