import { CheckIcon, LinkIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { InfoNumberBox } from "~/components/generic/InfoNumberBox";

export default function HowToUse() {
  return (
    <>
      <Head>
        <title>How Reply Master Works | Automate Comment Replies</title>
        <meta
          name="description"
          content="Learn how Reply Master simplifies managing Facebook and Instagram pages by automating comment replies. Connect your accounts, provide preferences, and let AI handle the rest."
        />
        <meta
          name="keywords"
          content="Reply Master, automate comment replies, Facebook automation, Instagram automation, social media management, AI comment replies, how it works"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-5">
        <h1 className="mb-10 text-center text-xl  text-textPrimary-900">
          <span className="text-bold text-primary-800">How</span> to Use?
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
          header="Connect Your Facebook and Instagram Pages to Reply Master"
          text="Sign in with your Facebook account to connect the Instagram business pages you manage. Make sure each Instagram page is a business account linked to a Facebook Page."
        />

        <InfoNumberBox
          number={2}
          header="Provide Your Page Information"
          text="Tell us a bit about your pages, including their business type, your goals with Reply Master, and the desired tone for comment replies."
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
          header="You're All Set!"
          text="Enjoy automated replies! Our AI will handle comments regularly, following the preferences you've set."
        />
      </main>
    </>
  );
}
