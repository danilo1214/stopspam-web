import { signIn } from "next-auth/react";
import Button from "~/components/generic/Button";

export const SignInButton = () => {
  return (
    <div className="relative rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-1  transition duration-100 hover:scale-105 hover:from-primary-400 hover:to-secondary-400">
      <Button
        label="Get Started"
        onClick={() => signIn("facebook")}
        className="w-full rounded-full bg-white text-center text-textPrimary-800"
      />
    </div>
  );
};
