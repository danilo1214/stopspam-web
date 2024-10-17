import classNames from "classnames";
import { GeistSans } from "geist/font/sans";
import { type NextComponentType, type NextPageContext } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { Footer } from "~/components/generic/Footer";
import Navbar from "~/components/navigation/NavBar";

export const Main = ({
  Component,
  ...pageProps
}: {
  Component: NextComponentType<NextPageContext>;
}) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
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
    );
  }

  return (
    <>
      <ToastContainer />
      <Navbar className={GeistSans.className} />
      <main
        className={classNames(GeistSans.className, "min-h-[100vh] bg-gray-100")}
      >
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
};
