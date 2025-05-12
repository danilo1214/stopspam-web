import { SparklesIcon, TrashIcon } from "@heroicons/react/24/solid";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import SuperJSON from "superjson";
import Button from "~/components/generic/Button";
import CustomSelect from "~/components/generic/Select";
import { Slider } from "~/components/generic/Slider";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import Link from "next/link";
import { env } from "~/env";
import { useSession } from "next-auth/react";

const vibes = ["Funny", "Casual", "Friendly", "Neutral", "Formal"];

const goals: { value: string; label: string }[] = [
  { value: "increase-sales", label: "To increase my sales" },
  { value: "boost-engagement", label: "To boost my page engagement" },
  { value: "idk", label: "I don't know" },
];

export default function Page() {
  const utils = api.useUtils();
  const { query, replace } = useRouter();
  const id = query.id as string;
  const { mutateAsync: triggerDemo, isPending: isTriggeringDemo } =
    api.commentReplies.triggerDemo.useMutation();
  const { mutateAsync: deletePage, isPending: isDeleting } =
    api.instagram.deletePage.useMutation();
  const { data: user, status } = useSession();

  const { mutateAsync: scheduleCron, isPending: isSchedulingReplies } =
    api.instagram.scheduleCron.useMutation();
  const { data: page, isError } = api.instagram.getSavedPage.useQuery(id);

  const [text, setText] = useState(page?.userDescription ?? "");

  const [vibe, setVibe] = useState(page?.vibe ? vibes.indexOf(page.vibe) : 0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(
    page?.goal ?? null,
  );
  const [selectedBusinessType, setSelectedBusinessType] = useState(
    page?.businessType ?? null,
  );

  const { mutate: updatePage } = api.instagram.updatePage.useMutation();

  const invalidatePageCache = () => {
    void utils.instagram.getSavedPage.invalidate();
  };

  const onPageSuccess = (msg: string) => {
    toast(msg);
    invalidatePageCache();
  };

  const handleOptionChange = (option: string) => {
    setSelectedGoal(option);
    updatePage(
      { id, goal: option },
      {
        onSuccess: () => {
          onPageSuccess("Successfully updated goal");
        },
      },
    );
  };

  const handleBusinessTypeChange = (option: string) => {
    setSelectedBusinessType(option);
    updatePage(
      { id, businessType: option },
      {
        onSuccess: () => {
          onPageSuccess("Successfully updated business type");
        },
      },
    );
  };

  const onChangeVibe = (v: number) => {
    setVibe(v);
    updatePage(
      { id, vibe: vibes[v] },
      {
        onSuccess: () => {
          onPageSuccess("Successfully updated tone");
          invalidatePageCache();
        },
      },
    );
  };

  if (isError || !page) {
    return (
      <h1 className="text-lg font-semibold text-textPrimary-900">Not found</h1>
    );
  }

  const isDemoFinished = page.hasDemoed && page.demoReplies.length > 0;

  return (
    <main>
      <div className="flex w-full content-center  items-center justify-center md:justify-normal">
        <Link href="/app">
          <div className="inline-block rounded-md px-4 py-2 font-normal text-textPrimary-700 no-underline hover:text-textPrimary-900 focus:outline-none dark:text-textPrimary-100  dark:hover:text-textPrimary-300">
            Pages
          </div>
        </Link>{" "}
        <span className=" text-textPrimary-400">/</span>
        <Link href={`/pages/${id}`}>
          <div className="inline-block rounded-md px-4 py-2 font-normal text-textPrimary-900 no-underline hover:text-textPrimary-900 focus:outline-none dark:text-textPrimary-100  dark:hover:text-textPrimary-300">
            {page.username}
          </div>
        </Link>{" "}
      </div>

      <div className="m-2 rounded-lg  bg-white px-4 py-5 shadow lg:m-10">
        <div className="my-8 flex flex-col justify-between md:flex-row">
          <div className=" flex items-center gap-x-4">
            <img
              referrerPolicy="no-referrer"
              src={page.profilePictureUrl}
              alt={page.username}
              className="size-10 rounded-full object-cover"
            />
            <h1 className="text-lg  text-textPrimary-900">{page.username}</h1>
          </div>
          <div className="flex gap-x-5">
            {user?.user.id === "cmajowjop00004ouoosxv5zsk" && (
              <Button
                icon={<SparklesIcon className="size-5 font-light text-white" />}
                label="Trigger Replies"
                disabled={isSchedulingReplies}
                onClick={async () => {
                  await scheduleCron();
                  toast("Successfully scheduled replies");
                }}
                className="transform rounded-lg bg-primary-600    px-4 py-2 text-white shadow-md transition duration-200 ease-in-out hover:scale-105"
              />
            )}
            {!page.hasDemoed && (
              <Button
                icon={<SparklesIcon className="size-5 font-light text-white" />}
                label="Demo"
                disabled={isTriggeringDemo}
                onClick={async () => {
                  await triggerDemo(Number(id));
                  await utils.instagram.getSavedPages.invalidate();
                  toast("Successfully scheduled demo");
                  await replace("/app");
                }}
                className="transform rounded-lg bg-primary-600    px-4 py-2 text-white shadow-md transition duration-200 ease-in-out hover:scale-105"
              />
            )}

            {isDemoFinished && (
              <Link
                href={`/pages/${id}/demo`}
                className="flex transform gap-x-2 rounded-lg bg-primary-600    px-4 py-2 text-white shadow-md transition duration-200 ease-in-out hover:scale-105"
              >
                <SparklesIcon className="size-5 font-light text-white" /> View
                Demo
              </Link>
            )}

            <Button
              icon={
                <TrashIcon className="size-5 font-light text-secondary-600" />
              }
              label="Delete"
              disabled={isDeleting}
              onClick={async () => {
                await deletePage({ id: Number(id) });
                await utils.instagram.getSavedPages.invalidate();
                toast("Successfully removed page");
                await replace("/app");
              }}
              className="transform rounded-lg  bg-white  px-4 py-2 text-secondary-600 shadow-md transition duration-200 ease-in-out hover:scale-105"
            />
          </div>
        </div>

        <div className="my-8 flex w-full flex-col content-between gap-x-6 lg:flex-row">
          <div>
            <div className="mb-2">
              <label className="text-textPrimary-900">Goal</label>
              <div className="text-sm text-textPrimary-600">
                What is your goal?
              </div>
            </div>
            <CustomSelect
              onOptionChange={handleOptionChange}
              options={goals}
              value={selectedGoal ?? undefined}
            />
          </div>

          <div>
            <div className="mb-2">
              <label className="text-textPrimary-900">Business type</label>
              <div className="text-sm text-textPrimary-600">
                What type of business do you own?
              </div>
            </div>
            <CustomSelect
              options={[
                { label: "Restaurant", value: "Restaurant" },
                { label: "Clothing Store", value: "Clothing Store" },
              ]}
              value={selectedBusinessType ?? undefined}
              onOptionChange={handleBusinessTypeChange}
            />
          </div>
        </div>

        <div className="my-8">
          <div className="mb-2">
            <label className="text-textPrimary-900">Comment tone</label>
            <div className="text-sm text-textPrimary-600">
              Select the tone of your comments.
            </div>
          </div>
          <Slider value={vibe} onChange={onChangeVibe} labels={vibes} />
        </div>

        <div>
          <div className="mb-2">
            <label className="text-textPrimary-900">Brief description</label>
            <div className="text-sm text-textPrimary-600">
              Describe your business in a few sentences. Any additional requests
              should go here.
            </div>
          </div>

          <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 ">
            <div className="rounded-t-lg bg-white p-2 dark:bg-gray-800">
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                rows={5}
                id="comment"
                className="focus:ring-none w-full border-0 bg-white px-2 pt-1 text-sm text-gray-900 focus:outline-1 focus:outline-indigo-300"
                placeholder="Enter a prompt..."
                required
              />

              <Button
                onClick={async () => {
                  updatePage(
                    { id, description: text },
                    {
                      onSuccess: () => {
                        toast("Successfully updated description");
                        invalidatePageCache();
                      },
                    },
                  );
                }}
                label="Update description"
                className="focus:shadow-outline rounded-md bg-primary-600 p-3   text-white transition duration-150 ease-in-out hover:bg-primary-500 focus:outline-none"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!context.params?.id) {
    return {};
  }

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
    helpers.instagram.getFacebookAccount.fetch(undefined, { context }),
    helpers.instagram.getSavedPage.fetch(context.params.id as string, {
      context,
    }),
  ]);

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
