import { PlusIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Button from "~/components/generic/Button";

import { api } from "~/utils/api";

export default function Home() {
  const { mutate: cron } = api.cronRouter.job.useMutation();

  return (
    <>
      <Head>
        <title>Instagram admin manager</title>
        <meta name="description" content="Keyyy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        hiii
        <Button
          icon={<PlusIcon className="size-5 font-light text-textPrimary-100" />}
          label="CRON"
          className="mb-4 max-w-[100px] rounded-lg bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700"
          onClick={() => cron({ secret: "123" })}
        ></Button>
      </main>
    </>
  );
}
