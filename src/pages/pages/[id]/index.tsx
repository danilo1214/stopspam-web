import { SparklesIcon, TrashIcon } from "@heroicons/react/24/solid";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
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
import { InstagramPageType } from "@prisma/client";
import { vibes, niches, goals, businesses } from "~/const";
import { Switch } from "@headlessui/react";
import classNames from "classnames";

const placeholderDescriptions: Record<string, string> = {
  Influencer:
    "Reply in a fun, casual tone. Thank people for compliments and encourage engagement.",
  Creator:
    "Reply in a friendly, engaging way. Appreciate compliments and invite followers to check your content.",
  Gamer:
    "Reply with excitement and gaming slang. Hype up wins, thank fans, and joke around with the community.",
  Vlogger:
    "Reply like a behind-the-scenes friend. Thank people for watching and invite them to your next vlog.",
  "Beauty Guru":
    "Reply in a warm, upbeat tone. Thank followers for love and recommend products if asked.",
  "Fitness Coach":
    "Reply in a motivational tone. Encourage progress, answer basic fitness questions, and guide to programs.",
  "Lifestyle Blogger":
    "Reply in a friendly, conversational tone. Share tips lightly and thank followers for support.",
  "Travel Blogger":
    "Reply with wanderlust vibes. Thank for comments and share fun travel tips if asked.",
  "Tech Reviewer":
    "Reply in an informative but approachable tone. Answer product questions and share quick insights.",
  "DIY Creator":
    "Reply in a helpful, upbeat tone. Thank for love and encourage followers to try the projects.",
  Photographer:
    "Reply warmly. Thank people for compliments and discuss gear or locations if asked.",
  Artist:
    "Reply creatively and warmly. Thank for compliments and briefly mention inspiration or technique if asked.",
  Model:
    "Reply in a fun, flirty, confident tone. Thank for love and keep engagement light.",
  Musician:
    "Reply with enthusiasm and gratitude. Thank fans and guide to streaming links if they ask.",
  Podcaster:
    "Reply conversationally and engaging. Thank listeners and point them to episodes if asked.",
  "Food Blogger":
    "Reply warmly and deliciously. Thank for comments and share recipe or restaurant hints if asked.",
  "Parenting Blogger":
    "Reply in a supportive, empathetic tone. Thank for engagement and share small tips if relevant.",
  "Finance Educator":
    "Reply in a trustworthy, friendly tone. Thank for comments and clarify simple finance questions.",
  "Comedy Creator":
    "Reply playfully and humorously. Thank for laughs and keep the tone fun and light.",
  Educator:
    "Reply helpfully and encouragingly. Thank for engagement and point to resources if relevant.",
  Streamer:
    "Reply with energy and gamer slang. Thank for support and hype the next stream.",
  Restaurant:
    "Reply politely and friendly. Thank people for compliments and invite them to visit or book a table.",
  "Clothing Store":
    "Reply warmly. Thank for comments and mention where to shop if they ask.",
  Café: "Reply in a cozy, friendly tone. Thank guests and share popular menu items if asked.",
  "Barber Shop":
    "Reply casually and friendly. Thank for love and encourage bookings or walk-ins.",
  "Beauty Salon":
    "Reply in a glam and welcoming tone. Thank for compliments and guide to booking if asked.",
  Gym: "Reply motivationally. Thank for engagement and invite to join or check membership info.",
  "Fitness Studio":
    "Reply with energy and encouragement. Thank for support and share how to join classes.",
  Spa: "Reply calmly and warmly. Thank for kind words and invite to book a session if asked.",
  "Tattoo Parlor":
    "Reply in a cool, casual tone. Thank for compliments and share booking info if asked.",
  Bookstore:
    "Reply warmly and bookish. Thank for love and recommend titles if they ask.",
  "Pet Store":
    "Reply cheerfully. Thank for comments and answer simple pet or product questions.",
  Bakery:
    "Reply in a sweet, friendly tone. Thank for love and mention popular pastries if asked.",
  "Photography Studio":
    "Reply warmly and professionally. Thank for compliments and invite for bookings.",
  Florist:
    "Reply in a warm, cheerful tone. Thank for kind words and suggest bouquets if asked.",
  "Car Wash":
    "Reply casually and helpful. Thank for love and encourage visits or bookings.",
  "Real Estate Agency":
    "Reply professionally but friendly. Thank for engagement and guide to contact for listings.",
  "Marketing Agency":
    "Reply in a smart, professional tone. Thank for comments and invite inquiries if asked.",
  "Tech Startup":
    "Reply friendly and innovative. Thank for support and briefly hint at features if asked.",
  "E-commerce Store":
    "Reply in a helpful and warm tone. Thank for comments and guide to the website for purchases.",
  "Event Planning Service":
    "Reply enthusiastically and professional. Thank for interest and invite to book or inquire.",
};

export default function Page() {
  const utils = api.useUtils();
  const { query, replace } = useRouter();
  const id = query.id as string;
  const { mutateAsync: triggerDemo, isPending: isTriggeringDemo } =
    api.commentReplies.triggerDemo.useMutation();
  const { mutateAsync: deletePage, isPending: isDeleting } =
    api.instagram.deletePage.useMutation();
  const { data: user } = useSession();

  const { mutateAsync: scheduleCron, isPending: isSchedulingReplies } =
    api.instagram.scheduleCron.useMutation();
  const { data: page, isError } = api.instagram.getSavedPage.useQuery(id);

  const [text, setText] = useState(page?.userDescription ?? "");

  const [paused, setPaused] = useState(page?.paused);

  const [vibe, setVibe] = useState(page?.vibe ? vibes.indexOf(page.vibe) : 0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(
    page?.goal ?? null,
  );
  const [selectedSubType, setSelectedSubType] = useState(page?.subType ?? null);

  const [selectedPageType, setSelectedPageType] = useState(page?.type ?? null);

  const { mutate: updatePage } = api.instagram.updatePage.useMutation();

  const invalidatePageCache = () => {
    void utils.instagram.getSavedPage.invalidate();
  };

  const onPageSuccess = (msg: string) => {
    toast(msg);
    invalidatePageCache();
  };

  const handlePauseToggle = () => {
    setPaused(!paused);
    updatePage(
      { id, paused: !paused },
      {
        onSuccess: () => {
          onPageSuccess(
            paused ? "Successfully unpaused page" : "Successfully paused page",
          );
        },
      },
    );
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

  const handlePageTypeChange = (option: InstagramPageType) => {
    setSelectedPageType(option);
    updatePage(
      { id, type: option },
      {
        onSuccess: () => {
          onPageSuccess("Successfully updated page type");
        },
      },
    );
  };

  const handleSubTypeChange = (option: string) => {
    setSelectedSubType(option);
    updatePage(
      { id, subType: option },
      {
        onSuccess: () => {
          onPageSuccess("Successfully updated subtype");
        },
      },
    );
  };

  const handleDescriptionCtaClick = async () => {
    if (text) {
      updatePage(
        { id, description: text },
        {
          onSuccess: () => {
            toast("Successfully updated description");
            invalidatePageCache();
          },
        },
      );
    } else if (selectedSubType) {
      setText(placeholderDescriptions[selectedSubType] ?? "");
    }
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

  const subTypeItem = useMemo(() => {
    return page?.type === InstagramPageType.BUSINESS ? (
      <div>
        <div className="mb-2">
          <label className="text-textPrimary-900">Business type</label>
          <div className="text-sm text-textPrimary-600">
            What type of business do you own?
          </div>
        </div>
        <CustomSelect
          canSelectSearch
          disabled={paused}
          options={businesses}
          value={selectedSubType ?? undefined}
          onOptionChange={handleSubTypeChange}
        />
      </div>
    ) : (
      <div>
        <div className="mb-2">
          <label className="text-textPrimary-900">Niche</label>
          <div className="text-sm text-textPrimary-600">
            What niche best describes you?
          </div>
        </div>
        <CustomSelect
          disabled={paused}
          canSelectSearch
          options={niches}
          value={selectedSubType ?? undefined}
          onOptionChange={handleSubTypeChange}
        />
      </div>
    );
  }, [page?.type, handleSubTypeChange, selectedSubType]);

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
        <Switch
          checked={!paused}
          onChange={handlePauseToggle}
          className={`${
            !paused ? "bg-primary-600" : "bg-textSecondary-500"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span
            className={`${
              !paused ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <span className="ml-2 text-sm text-textPrimary-600">
          {paused ? "Paused" : "Active"}
        </span>

        <div className="my-8 flex flex-col justify-between md:flex-row">
          <div className=" flex items-center gap-x-4 lg:w-64">
            <img
              referrerPolicy="no-referrer"
              src={page.profilePictureUrl}
              alt={page.username}
              className="size-10 rounded-full object-cover"
            />
            <div>
              <h1
                className={classNames(
                  "text-lg  ",
                  paused ? "text-textPrimary-400" : " text-textPrimary-900",
                )}
              >
                {page.username} -{" "}
                <span
                  className={classNames(
                    "text-sm text-textPrimary-600",
                    paused ? "text-textPrimary-600" : "",
                  )}
                >
                  {page.followers} followers
                </span>
              </h1>
              <div
                className={classNames(
                  "text-sm text-textPrimary-600",
                  paused ? "text-textPrimary-600" : "",
                )}
              >
                {page.biography}
              </div>
            </div>
          </div>
          <div className="flex gap-x-5 py-2 lg:py-3">
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
        <div className="my-8 flex w-full flex-col content-between gap-x-6 gap-y-4 lg:flex-row">
          <div>
            <div className="mb-2">
              <label className="text-textPrimary-900">Goal</label>
              <div className="text-sm text-textPrimary-600">
                What is your goal?
              </div>
            </div>
            <CustomSelect
              disabled={paused}
              onOptionChange={handleOptionChange}
              options={goals}
              value={selectedGoal ?? undefined}
            />
          </div>

          <div>
            <div className="mb-2">
              <label className="text-textPrimary-900">Profile type</label>
              <div className="text-sm text-textPrimary-600">
                What is your use case?
              </div>
            </div>
            <CustomSelect
              disabled={paused}
              options={[
                { label: "Business", value: InstagramPageType.BUSINESS },
                { label: "Creator", value: InstagramPageType.CREATOR },
              ]}
              value={selectedPageType ?? undefined}
              onOptionChange={(v) =>
                handlePageTypeChange(v as InstagramPageType)
              }
            />
          </div>

          {subTypeItem}
        </div>
        <div>
          <div className="mb-2">
            <label className="text-textPrimary-900">
              What should we say in your comments?
            </label>
            <div className="text-sm text-textPrimary-600">
              ✨ Tell us about your business, and how you would like us to
              reply.
            </div>
          </div>

          <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 ">
            <div className="rounded-t-lg bg-white p-2 dark:bg-gray-800">
              <textarea
                disabled={paused}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                rows={5}
                id="comment"
                className="focus:ring-none w-full border-0 bg-white px-2 pt-1 text-gray-900 focus:outline-1 focus:outline-indigo-300"
                placeholder="Example: I am a fashion influencer sharing daily outfits and style tips. Reply in a fun, upbeat tone. If someone compliments my look, thank them warmly. If they ask where to buy, tell them to DM me."
                required
              />

              <Button
                onClick={handleDescriptionCtaClick}
                disabled={paused}
                label={text ? "Update description" : "💡 Auto-Fill Example"}
                className="focus:shadow-outline  rounded-md bg-primary-600   p-3 text-white transition duration-150 ease-in-out hover:bg-primary-500 focus:outline-none lg:w-64"
              ></Button>
            </div>
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
