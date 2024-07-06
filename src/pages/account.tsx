// pages/account.tsx
import { useSession } from "next-auth/react";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "~/components/generic/Button";
import { CTABanner } from "~/components/pricing/SubscriptionBanner";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function AccountPage() {
  const router = useRouter();
  const subscriptionApi = api.subscriptions;

  const { data: user } = useSession();

  const { data: subscription, isLoading: isSubscriptionLoading } =
    subscriptionApi.getCurrent.useQuery({});

  const { isPending: isCancelLoading, mutate: cancelSub } =
    subscriptionApi.cancelSubscription.useMutation({});

  const { isPending: isResumeLoading, mutate: resumeSub } =
    subscriptionApi.resumeSubscription.useMutation({});

  const { mutate: deleteAccount } = subscriptionApi.deleteAccount.useMutation();

  const handleDeleteAccount = async () => {
    await deleteAccount();
    router.replace("/");
  };

  const handleSubscriptionToggle = () => {
    if (subscription?.status === "active") {
      cancelSub(undefined, {
        onSuccess: () => {
          alert("Subscription canceled");
        },
      });
    } else {
      resumeSub(undefined, {
        onSuccess: () => {
          alert("Subscription resumed");
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
        <div className="mb-10">
          <CTABanner />
        </div>
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
            <p className="text-gray-700">
              Subscription Status:{" "}
              <span className="font-semibold">{subscription?.status}</span>{" "}
              until{" "}
              <span className="font-semibold">
                {subscription?.expires.toDateString()}
              </span>
            </p>
          </div>
        ) : (
          <></>
        )}
        <div className="mt-10 flex flex-col space-y-4">
          <Button
            icon={
              <TrashIcon className="size-5 font-light text-secondary-400" />
            }
            label="Delete account"
            onClick={handleDeleteAccount}
            className="transform  rounded-lg  px-6 py-2 text-lg text-secondary-600 shadow-md transition duration-200 ease-in-out hover:scale-105"
          />
          {subscription && (
            <button
              onClick={handleSubscriptionToggle}
              className="transform rounded-lg  px-6 py-2 text-lg text-primary-600 shadow-md transition duration-200 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isCancelLoading || isResumeLoading}
            >
              {subscription.status === "active"
                ? "Cancel Subscription"
                : "Resume Subscription"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
