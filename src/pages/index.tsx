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
      <main className="flex w-full flex-col bg-white text-white">
        <div
          className="flex flex-col content-between items-center justify-center bg-primary-600 py-10 lg:flex-row lg:items-start lg:space-x-20"
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
          <div className="space-y-4 p-4 text-center md:m-10 lg:mt-10 lg:max-w-3xl lg:p-10 lg:text-left">
            <h1 className="text-2xl font-semibold text-textPrimary-100">
              Never Miss a Comment, Never Lose a Customer
            </h1>
            <p className="text-lg text-textPrimary-200">
              Reply Master uses cutting edge AI to interract with your social
              media page comments. Engage with your audience 24/7, even when
              you’re busy running your business.
            </p>

            <div className="flex w-full justify-center lg:justify-start">
              <SignInButton />
            </div>
          </div>

          <Image src="/tst.png" width={500} height={1000} alt="hh" />
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

        <div className="mt-10 bg-white p-4 text-center text-textPrimary-900 lg:p-10">
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

        <div className=" bg-gray-100 p-10">
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
