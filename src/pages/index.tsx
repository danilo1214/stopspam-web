import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Button from "~/components/generic/Button";
import { SignInButton } from "~/components/navigation/SignInButton";
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
      <main className="flex w-full flex-col  bg-white text-white">
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
          <div className=" mt-10 max-w-3xl p-5 text-center md:p-16 md:text-left">
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

        <div className="bg-white p-5 text-center text-textPrimary-900">
          <h3 className="text-md font-bold text-tertiary-800">Leverage AI</h3>
          <h2 className="text-2xl font-semibold">
            Engage with your audience without draining your time
          </h2>
          <p className="mt-5">
            {" "}
            Running a business is hard. Let alone replying to all those
            comments. Here are three ways we can help.{" "}
          </p>
        </div>
      </main>
    </>
  );
}
