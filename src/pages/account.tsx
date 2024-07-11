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

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  const handleDeleteAccount = async () => {
    await deleteAccount();
    router.replace("/");
  };

  const handleSubscriptionToggle = () => {
    if (subscription?.status === "active") {
      cancelSub(undefined, {
        onSuccess: () => {
          setTimeout(() => {
            utils.subscriptions.getCurrent.invalidate();
          }, 1000);
          toast("Subscription canceled");
        },
      });
    } else {
      resumeSub(undefined, {
        onSuccess: () => {
          utils.subscriptions.getCurrent.invalidate();
          toast("Subscription resumed");
          setTimeout(() => {
            utils.subscriptions.getCurrent.invalidate();
          }, 1000);
        },
      });
    }
  };

  if (isSubscriptionLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10 flex items-center justify-center ">
      <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-lg">
        {(!subscription && !isSubscriptionLoading) ||
          (subscription?.status === "cancelled" && (
            <div className="mb-10">
              <CTABanner />
            </div>
          ))}
        <div className="mb-6 flex flex-col items-center">
          <img
            src={user?.user.image ?? ""} // Replace with actual path to profile picture
            alt="Profile Picture"
            className="mb-3 h-10 w-10 rounded-full"
          />
          <h1 className="text-2xl font-semibold">{user?.user.name}</h1>
        </div>
        {subscription ? (
          <div className="mb-6 mt-10 text-center">
            <div className="text-gray-700">
              Subscription{" "}
              <Badge
                label={subscription.status}
                type={subscription.status === "active" ? "success" : "error"}
              />{" "}
              until{" "}
              <span className="font-semibold">
                {subscription?.expires.toDateString()}
              </span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="mt-10 flex flex-col space-y-4">
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
              <TrashIcon className="size-5 font-light text-secondary-400" />
            }
            label="Delete account"
            onClick={handleDeleteAccount}
            className="transform  rounded-lg  px-4 py-2 text-lg text-secondary-600 shadow-md transition duration-200 ease-in-out hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
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
