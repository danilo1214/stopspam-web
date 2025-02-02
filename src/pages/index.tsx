import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useBreakpoint } from "~/hooks/media";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  console.log(status);

  if (status === "unauthenticated") {
    void router.push("/get-started");
  }

  if (status === "authenticated") {
    void router.push("/app");
  }

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

      <div className="flex h-[100vh] w-full content-center items-center justify-center bg-primary-600">
        <Image
          loading="lazy"
          alt="logo"
          width={100}
          height={100}
          src="/logo.png"
          className="animate-bounce"
        />
      </div>
    </>
  );
}
