import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { httpLink } from "@trpc/client/links/httpLink";
import { withTRPC } from "@trpc/next";

import "react-toastify/dist/ReactToastify.css";
import "~/styles/globals.css";
import { type AppRouter } from "~/server/api/root";
import SuperJSON from "superjson";
import { Main } from "~/components/Main";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Main Component={Component} {...pageProps} />
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
