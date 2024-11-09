import Image from "next/image";
import { SignInButton } from "~/components/navigation/SignInButton";

export const GetStartedBanner = () => {
  return (
    <div className="mb-24 mt-4 flex flex-col items-center gap-y-2">
      <Image loading="lazy" alt="logo" width={80} height={80} src="/logo.png" />
      <h1 className="text-3xl font-semibold text-textPrimary-100">
        Never Miss a Comment, Never Lose a Customer
      </h1>
      <p className="text-lg text-textPrimary-300">
        Boost your social media brand with AI using Reply Master.
      </p>

      <SignInButton />
    </div>
  );
};
