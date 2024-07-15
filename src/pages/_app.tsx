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
import { AppRouter } from "~/server/api/root";
import SuperJSON from "superjson";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <Navbar className={GeistSans.className} />
      <main className={GeistSans.className}>
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
