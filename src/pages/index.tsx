import { PlusIcon } from "@heroicons/react/24/outline";
import {
  BanknotesIcon,
  ChartBarIcon,
  CheckIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Button from "~/components/generic/Button";
import { SignInButton } from "~/components/navigation/SignInButton";
import { PricingList } from "~/components/pricing/PricingList";
import { cards } from "~/const";
import { useBreakpoint } from "~/hooks/media";

export default function Home() {
  const { isLargeScreen } = useBreakpoint();

  return (
    <>
      <Head>
        <title>
          Reply Master: AI-Powered Social Media Engagement for Facebook &
          Instagram
        </title>
        <meta
          name="description"
          content="Boost your business with Reply Master, the AI-driven tool for automating comment replies. Engage customers 24/7, save time, and enhance customer loyalty."
        />
        <meta
          name="keywords"
          content="social media automation, AI comment replies, Reply Master, Facebook comment automation, Instagram comment automation, customer engagement, business automation, social media engagement"
        />
        <meta
          property="og:title"
          content="Reply Master: AI-Powered Social Media Engagement for Facebook & Instagram"
        />
        <meta
          property="og:description"
          content="Engage customers and save time with Reply Master's AI automation for Instagram comments. Keep your audience engaged, even when you're offline."
        />
        <meta property="og:image" content="/home.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta
          name="twitter:title"
          content="Reply Master: AI-Powered Social Media Engagement"
        />
        <meta
          name="twitter:description"
          content="Automate  Instagram comment replies with Reply Master. Engage customers, save time, and grow your business effortlessly."
        />
        <meta name="twitter:image" content="/hero.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-col bg-white text-white">
        <div
          className="flex flex-col content-between items-center justify-center gap-y-20 bg-primary-600 py-10 lg:flex-row lg:items-start lg:space-x-20 lg:px-10"
          style={
            true
              ? {
                  background: "url('/bg.png')",
                  backgroundRepeat: "round",
                  backgroundSize: "cover",
                }
              : {}
          }
        >
          <div className="space-y-5 p-8 md:p-6 lg:mt-10  lg:space-y-4  lg:p-10 lg:text-left">
            <h1 className="text-4xl font-semibold text-textPrimary-100">
              Never Miss a Comment, Never Lose a Customer
            </h1>

            <div className="flex flex-col gap-y-1 text-textPrimary-200">
              <div className="flex items-center gap-x-1 text-lg ">
                <CheckIcon
                  className="text-tertiary-600"
                  height={17}
                  width={17}
                />
                <div>Boost customer engagement automatical</div>
              </div>
              <div className="flex items-center gap-x-1 text-lg ">
                <CheckIcon
                  className="text-tertiary-600"
                  height={17}
                  width={17}
                />
                <div>Strengthen customer loyalty with rapid replies.</div>
              </div>
              <div className="flex items-center gap-x-1 text-lg ">
                <CheckIcon
                  className="text-tertiary-600"
                  height={17}
                  width={17}
                />
                <div>Focus on growth while AI manages the conversations</div>
              </div>
            </div>
            <p className="text-sm text-textPrimary-200">
              Reply Master uses cutting edge AI to interract with your social
              media page comments. Engage with your audience 24/7, even when
              you’re busy running your business.
            </p>
            <div className="flex w-full justify-center lg:justify-start">
              <SignInButton />
            </div>
          </div>

          <Image src="/home.png" width={450} height={200} alt="hh" />
        </div>

        <div className="mt-4 flex flex-col items-center bg-white p-4 text-center text-textPrimary-900 lg:p-10">
          <h3 className="text-md font-bold text-tertiary-800">
            Empower Your Business
          </h3>
          <h2 className="text-2xl font-bold">
            Automate Your Social Media Engagement with AI
          </h2>
          <p className="mt-3 lg:px-20">
            {" "}
            Our advanced AI technology automatically responds to your social
            media comments with accurate and relevant information, ensuring your
            customers always get the answers they need, quickly and efficiently.{" "}
          </p>

          <Image
            loading="lazy"
            className="mt-4"
            src="/hero.png"
            width={350}
            height={300}
            alt="hh"
          />
        </div>

        <div className="mt-8 bg-white p-4 text-center text-textPrimary-900 lg:p-10">
          <h3 className="text-md font-bold text-tertiary-800">We can help!</h3>
          <h2 className="text-2xl font-bold">
            Engage with your audience without draining your time
          </h2>
          <p className="mt-3">
            {" "}
            Running a business is hard. Let alone replying to all those
            comments. Here are three ways we can help.{" "}
          </p>

          <div className="my-5 flex w-full flex-col justify-center gap-y-10 lg:flex-row lg:gap-x-20 lg:gap-y-0">
            <div className="flex flex-1 flex-col items-center align-middle">
              <ClockIcon className=" size-16 font-light text-primary-600" />
              <h1 className="text-lg font-semibold">Time Management</h1>
              <p className="my-2 text-sm font-light">
                Our service ensures that every comment gets a response in real
                time, so you can focus on what you do best—growing your
                business.
              </p>
            </div>

            <div className="flex flex-1 flex-col items-center align-middle">
              <BanknotesIcon className=" size-16 font-light text-primary-600" />
              <h1 className="text-lg font-semibold">Maximized Opportunities</h1>
              <p className="my-2 text-sm font-light">
                We help you capture every opportunity by automatically replying
                to comments with personalized responses, even outside of
                business hours.
              </p>
            </div>

            <div className="flex flex-1 flex-col items-center align-middle">
              <ChartBarIcon className="size-16 font-light text-primary-600" />
              <h1 className="text-lg font-semibold">Customer Engagement</h1>
              <p className="my-2 text-sm font-light">
                Maintain high engagement without the stress. Our service keeps
                your community active and engaged, building trust and loyalty
                with every interaction.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-primary-600 py-10 align-middle">
          <h1 className="px-5 pb-5 pt-20 text-center text-3xl font-semibold text-white lg:px-20">
            71% of consumers who have had a positive social media experience
            with a brand are likely to recommend it to others.
          </h1>
          <div className="shadow-xl">
            <SignInButton />
          </div>
        </div>

        <div className=" bg-gray-100 p-10">
          <PricingList cards={cards} />
        </div>
      </main>
    </>
  );
}
