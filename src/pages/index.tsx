import Head from "next/head";
import { useState } from "react";
import { AccountList } from "~/components/accounts/AccountList";
import { Modal } from "~/components/generic/Modal";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";

import { api } from "~/utils/api";

export default function Home() {
  const { data: subscription, isLoading: isSubscriptionLoading } =
    api.subscriptions.getCurrent.useQuery({});

  const { data: pages } = api.instagram.getAccounts.useQuery();

  console.log(pages);

  const channels = [
    { name: "Luna Sneakers", platform: "Instagram", locked: false },
    { name: "LunaSneakersOfficial", platform: "Instagram", locked: false },
    { name: "LunaSneakers", platform: "Instagram", locked: false },
    { name: "Luna Sneakers", platform: "Instagram", locked: true },
    { name: "Luna Sneakers", platform: "Instagram", locked: true },
    { name: "Luna Sneakers", platform: "Instagram", locked: true },
    { name: "LunaFlyers", platform: "Instagram", locked: true },
    { name: "Luna Sneakers (Mike)", platform: "Instagram", locked: true },
  ];
  return (
    <>
      <Head>
        <title>Instagram admin manager</title>
        <meta name="description" content="Keyyy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {(!isSubscriptionLoading && !subscription) ||
          (subscription?.status === "cancelled" && (
            <div className="mx-10">
              <CTABanner />
            </div>
          ))}
        <AccountList channels={channels} />
      </main>
    </>
  );
}
