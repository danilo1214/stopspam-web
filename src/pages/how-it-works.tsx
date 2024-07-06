import Head from "next/head";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>How it works?</title>
        <meta name="description" content="How it works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>It workz</main>
    </>
  );
}
