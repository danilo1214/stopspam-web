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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex flex-col items-center">
          <img
            src={user?.user.image ?? ""} // Replace with actual path to profile picture
            alt="Profile Picture"
            className="mb-4 h-24 w-24 rounded-full"
          />
          <h1 className="text-2xl font-semibold">{user?.user.name}</h1>
        </div>
        <div className="mb-6">
          <p className="text-gray-700">
            Subscription Status:{" "}
            <span className="font-semibold">{subscription?.status}</span>
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleDeleteAccount}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete Account
          </button>
          <button
            onClick={handleSubscriptionToggle}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
