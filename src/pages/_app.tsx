import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { httpLink } from "@trpc/client/links/httpLink";
import { withTRPC } from "@trpc/next";

import { api } from "~/utils/api";

import "react-toastify/dist/ReactToastify.css";
import "~/styles/globals.css";
import Navbar from "~/components/generic/NavBar";
import { ToastContainer } from "react-toastify";
import { type AppRouter } from "~/server/api/root";
import SuperJSON from "superjson";
import classNames from "classnames";
import { BottomBar } from "~/components/generic/BottomBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <Navbar className={GeistSans.className} />
      <main
        className={classNames(
          GeistSans.className,
          "min-h-[100vh] bg-gray-100 p-5",
        )}
      >
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    return {
      links: [
        httpLink({
          url: "/api/trpc",
          transformer: SuperJSON,
        }),
      ],
    };
  },
  transformer: SuperJSON,
  // ssr: false,
})(MyApp);
