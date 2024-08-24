import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { httpLink } from "@trpc/client/links/httpLink";
import { withTRPC } from "@trpc/next";

import "react-toastify/dist/ReactToastify.css";
import "~/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { type AppRouter } from "~/server/api/root";
import SuperJSON from "superjson";
import classNames from "classnames";
import Navbar from "~/components/navigation/NavBar";
import { Footer } from "~/components/generic/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <Navbar className={GeistSans.className} />
      <main
        className={classNames(GeistSans.className, "min-h-[100vh] bg-gray-100")}
      >
        <Component {...pageProps} />
      </main>
      <Footer />
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
