import { signIn } from "next-auth/react";
import Button from "~/components/generic/Button";

export const SignInButton = () => {
  return (
    <Button
      label="Get Started now"
      onClick={() => signIn("facebook")}
      className="w-2xl rounded-full bg-tertiary-800 px-8 py-2 text-center  text-lg text-white  shadow-xl hover:bg-tertiary-700"
    />
  );
};
