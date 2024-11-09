// pages/account.tsx
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  TrashIcon,
  XMarkIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import Button from "~/components/generic/Button";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { AccessDenied } from "~/components/generic/AccessDenied";
import { Badge } from "~/components/generic/Badge";
import classNames from "classnames";
import { type GetServerSidePropsContext } from "next";
import { useMemo } from "react";
import { cards } from "~/const";
import Head from "next/head";

export default function AccountPage() {
  const utils = api.useUtils();
  const router = useRouter();
  const subscriptionApi = api.subscriptions;

  const { data: user, status } = useSession();

  const { data: subscription, isLoading: isSubscriptionLoading } =
    subscriptionApi.getCurrent.useQuery({});

  const { isPending: isCancelLoading, mutate: cancelSub } =
    subscriptionApi.cancelSubscription.useMutation({});

  const { isPending: isResumeLoading, mutate: resumeSub } =
    subscriptionApi.resumeSubscription.useMutation({});

  const { mutate: deleteAccount } = subscriptionApi.deleteAccount.useMutation();

  const currentPlan = useMemo(
    () =>
      cards.find((c) => c.checkoutId === subscription?.variantId.toString()),
    [subscription],
  );

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  const handleDeleteAccount = async () => {
    deleteAccount();
    await router.replace("/");
  };

  const handleSubscriptionToggle = () => {
    if (subscription?.status === "active") {
      cancelSub(undefined, {
        onSuccess: () => {
          setTimeout(() => {
            void utils.subscriptions.getCurrent.invalidate();
          }, 1000);
          toast("Subscription canceled");
        },
      });
    } else {
      resumeSub(undefined, {
        onSuccess: () => {
          void utils.subscriptions.getCurrent.invalidate();
          toast("Subscription resumed");
          setTimeout(() => {
            void utils.subscriptions.getCurrent.invalidate();
          }, 1000);
        },
      });
    }
  };

  if (isSubscriptionLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Account Settings | ReplyMaster</title>
        <meta
          name="description"
          content="Manage your account settings and subscription preferences on YourAppName."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Account Settings | YourAppName" />
        <meta
          property="og:description"
          content="Manage your account settings and subscription preferences on YourAppName."
        />
        <meta property="og:image" content="/images/yourapp-og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Account Settings | YourAppName" />
        <meta
          name="twitter:description"
          content="Manage your account settings and subscription preferences on YourAppName."
        />
        <meta
          name="twitter:image"
          content="/images/yourapp-twitter-image.png"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-5 mt-10 flex items-center justify-center ">
        <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={user?.user.image ?? ""} // Replace with actual path to profile picture
              alt="Profile Picture"
              className="mb-2 h-10 w-10 rounded-full"
            />
            <h1 className="text-2xl text-textPrimary-900">{user?.user.name}</h1>
          </div>

          {currentPlan && subscription && (
            <div className="my-4 flex flex-col gap-y-2">
              <div className="text-textPrimary-700">
                Current Subscription:{" "}
                <span className="text-textPrimary-800">
                  {currentPlan?.name}
                </span>
              </div>

              <div className="text-textPrimary-700">
                Billed as:{" "}
                <span className="text-textPrimary-800">
                  ${currentPlan?.price} per month
                </span>
              </div>

              <div className="text-textPrimary-700">
                Status:{" "}
                <span className="text-textPrimary-800">
                  <Badge
                    label={subscription.status}
                    type={
                      subscription.status === "active" ? "success" : "error"
                    }
                  />{" "}
                  until{" "}
                  <span className="font-semibold">
                    {subscription?.expires.toDateString()}
                  </span>
                </span>
              </div>
            </div>
          )}

          <div className="mt-16 flex flex-col space-y-4">
            {!subscription && !isSubscriptionLoading && (
              <div className="mb-10">
                <CTABanner />
              </div>
            )}

            {subscription && (
              <Button
                label={
                  subscription.status === "active"
                    ? "Cancel Subscription"
                    : "Resume Subscription"
                }
                icon={
                  subscription.status === "active" ? (
                    <XMarkIcon className="size-5 font-light text-textPrimary-100" />
                  ) : (
                    <ArrowPathRoundedSquareIcon className="size-5 font-light text-textPrimary-100" />
                  )
                }
                onClick={handleSubscriptionToggle}
                className={classNames(
                  "transform rounded-lg  bg-primary-600 px-4 py-2 text-lg text-textPrimary-100 shadow-md transition duration-200 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50",
                  subscription.status === "active" && " bg-secondary-600",
                )}
                disabled={isCancelLoading || isResumeLoading}
              ></Button>
            )}
            <Button
              icon={
                <TrashIcon className="size-5 font-light text-secondary-600" />
              }
              label="Delete account"
              onClick={handleDeleteAccount}
              className="transform rounded-lg  bg-white  px-4 py-2 text-lg text-secondary-600 shadow-md transition duration-200 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  if (req && res) {
    return {
      props: {
        session: await getServerSession(req, res, authOptions),
      },
    };
  }

  return {};
}
