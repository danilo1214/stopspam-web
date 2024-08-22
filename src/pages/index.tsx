import { PlusIcon } from "@heroicons/react/24/outline";
import {
  BanknotesIcon,
  ChartBarIcon,
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
        <title>Instagram admin manager</title>
        <meta name="description" content="Keyyy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-col text-white">
        <div
          className="flex flex-col content-between items-center justify-center bg-primary-600 lg:flex-row lg:items-start lg:space-x-20"
          style={
            isLargeScreen
              ? {
                  background: "url('/bg.png')",
                  backgroundRepeat: "round",
                  backgroundSize: "cover",
                }
              : {}
          }
        >
          <div className="p-10 text-center md:p-16 md:text-left lg:mt-10 lg:max-w-3xl lg:p-5">
            <h1 className="text-4xl font-semibold">
              Never Miss a Comment, Never Lose a Customer
            </h1>
            <p className="my-4 text-lg">
              Reply Master uses cutting edge AI to interract with your social
              media page comments. Engage with your audience 24/7, even when
              you’re busy running your business.
            </p>

            <div className="flex w-full justify-center lg:justify-start">
              <SignInButton />
            </div>
          </div>

          <Image src="/test.png" width={350} height={300} alt="hh" />
        </div>

        <div className="flex flex-col items-center bg-white p-20 text-center text-textPrimary-900">
          <h3 className="text-md font-bold text-tertiary-800">
            How does it work?
          </h3>
          <h2 className="text-2xl font-bold">Use the power of AI</h2>
          <p className="mt-5 lg:px-20">
            {" "}
            We use cutting edge artificial intelligence to automatically reply
            to your social media comments, with relevant information about your
            business. We use cutting edge artificial intelligence to
            automatically reply to your social media comments, with relevant
            information about your business.{" "}
          </p>

          <Image
            className="mt-5"
            src="/hero.png"
            width={350}
            height={300}
            alt="hh"
          />
        </div>

        <div className="bg-white p-10 text-center text-textPrimary-900">
          <h3 className="text-md font-bold text-tertiary-800">We can help!</h3>
          <h2 className="text-2xl font-bold">
            Engage with your audience without draining your time
          </h2>
          <p className="mt-5">
            {" "}
            Running a business is hard. Let alone replying to all those
            comments. Here are three ways we can help.{" "}
          </p>

          <div className="my-12 flex w-full flex-col justify-center gap-y-10 lg:flex-row lg:gap-x-20 lg:gap-y-0">
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

        <div className="p-10">
          <PricingList cards={cards} />
        </div>

        <div className="flex flex-col items-center bg-primary-600 py-20 align-middle">
          <h1 className="px-14 py-20 text-center text-3xl font-semibold text-white">
            71% of consumers who have had a positive social media experience
            with a brand are likely to recommend it to others.
          </h1>
          <div className="shadow-xl">
            <SignInButton />
          </div>
        </div>
      </main>
    </>
  );
}
