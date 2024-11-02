import { CheckIcon, LinkIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { InfoNumberBox } from "~/components/generic/InfoNumberBox";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>How it works?</title>
        <meta name="description" content="How it works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-5">
        <h1 className="mb-10 text-center text-lg font-bold text-textSecondary-900">
          How It Works?
        </h1>

        <InfoNumberBox
          number={1}
          icon={
            <LinkIcon
              height={50}
              width={50}
              className="mx-auto my-5 text-tertiary-600"
            />
          }
          header="Connect Your Facebook Account and Instagram Pages to Reply Master"
          text="Log in with your Facebook account, and connect the Instagram business pages managed by it. Please note that your Instagram pages must be business accounts linked to a Facebook Page."
        />

        <InfoNumberBox
          number={2}
          header="Set Up Your Pages"
          text="Share some basic information about your pages, including their business type, your goals with Reply Master, and the tone you'd like for comment replies."
          className="lg:ml-auto"
          icon={
            <TableCellsIcon
              height={50}
              width={50}
              className="text-tertiary-900"
            />
          }
        />

        <InfoNumberBox
          icon={
            <CheckIcon height={50} width={50} className="text-emerald-500" />
          }
          number={3}
          header="All Set!"
          text="Enjoy automated replies! Our AI will respond to comments at regular intervals based on the preferences you've provided."
        />
      </main>
    </>
  );
}
