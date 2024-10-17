import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import SuperJSON from "superjson";
import { AccountList } from "~/components/accounts/AccountList";
import { AccessDenied } from "~/components/generic/AccessDenied";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";

export default function Connect() {
  const { data: subscription, isLoading: isSubscriptionLoading } =
    api.subscriptions.getCurrent.useQuery({});

  const { status } = useSession();

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return (
    <main>
      {(!isSubscriptionLoading && !subscription) ||
        (subscription?.status === "cancelled" && (
          <div className="mx-10">
            <CTABanner />
          </div>
        ))}
      <AccountList />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: SuperJSON,
  });

  await Promise.all([
    helpers.subscriptions.getCurrent.fetch({}, { context }),
    helpers.instagram.getSavedPages.fetch(undefined, { context }),
  ]);

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
