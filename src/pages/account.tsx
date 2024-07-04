// pages/account.tsx
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

export default function AccountPage() {
  const subscriptionApi = api.subscriptions;

  const { data: user } = useSession();

  const { data: subscription, isLoading: isSubscriptionLoading } =
    subscriptionApi.getCurrent.useQuery({});

  const { isPending: isCancelLoading, mutate: cancelSub } =
    subscriptionApi.cancelSubscription.useMutation({});

  const { isPending: isResumeLoading, mutate: resumeSub } =
    subscriptionApi.resumeSubscription.useMutation({});

  const handleDeleteAccount = () => {
    // Add account deletion logic here
    alert("Account deleted");
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
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center">
          <img
            src={user?.user.image ?? ""} // Replace with actual path to profile picture
            alt="Profile Picture"
            className="mb-4 h-10 w-10 rounded-full"
          />
          <h1 className="text-2xl font-semibold">{user?.user.name}</h1>
        </div>
        <div className="mb-6 mt-10 text-center">
          <p className="text-gray-700">
            Subscription Status:{" "}
            <span className="font-semibold">{subscription?.status}</span> until{" "}
            <span className="font-semibold">
              {subscription?.expires.toDateString()}
            </span>
          </p>
        </div>
        <div className="mt-16 flex flex-col space-y-4">
          <button
            onClick={handleDeleteAccount}
            className="bg-primary-500  transform rounded-lg px-6 py-2 text-lg text-white shadow-md transition duration-200 ease-in-out hover:scale-105"
          >
            Delete Account
          </button>
          <button
            onClick={handleSubscriptionToggle}
            className="text-primary-600 border-primary-600 transform rounded-lg px-6 py-2 text-lg shadow-md transition duration-200 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isCancelLoading || isResumeLoading}
          >
            {subscription?.status === "active"
              ? "Cancel Subscription"
              : "Resume Subscription"}
          </button>
        </div>
      </div>
    </div>
  );
}
