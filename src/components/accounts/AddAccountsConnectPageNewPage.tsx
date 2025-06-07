import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ArrowsRightLeftIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { ADD_ACCOUNTS_STEPS } from "~/components/accounts/accounts.types";
import { AccountStepItem } from "~/components/accounts/AccountStepItem";
import Button from "~/components/generic/Button";
import { type FbPageResult } from "~/server/api/services/instagram";
import { api } from "~/utils/api";

export const AddAccountsConnectPageNewPage = ({
  connectingName,
  facebookAccounts,
  setCurrentStep,
}: {
  connectingName: string;
  facebookAccounts: FbPageResult[];
  setCurrentStep: (step: ADD_ACCOUNTS_STEPS) => void;
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const utils = api.useUtils();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-textPrimary-800">
          Connect Instagram @{connectingName} to a Facebook Page
        </h1>
        <p className="mt-2 text-sm text-textPrimary-700">
          To enable automation features on Instagram, it must be linked to a
          Facebook Business Page. Just follow the steps below.
        </p>
      </div>

      <div className="space-y-4 text-sm text-textPrimary-700">
        <AccountStepItem index="1">
          <>
            Choose an existing Facebook Business Page from the list below, or{" "}
            <a
              target="_blank"
              className="text-primary-500 underline"
              href="https://www.facebook.com/pages/creation"
            >
              create a new one
            </a>{" "}
            if needed.
          </>
        </AccountStepItem>

        <AccountStepItem index="2">
          <>
            Go to that Page’s{" "}
            <span className="font-medium text-textPrimary-900">Settings</span>{" "}
            and search for{" "}
            <span className="font-medium text-textPrimary-900">
              &quot;Instagram&quot;
            </span>
            .
          </>
        </AccountStepItem>

        <AccountStepItem index="3">
          <div>
            Connect your Instagram profile to the Facebook Page. You can do this
            directly through this{" "}
            <a
              target="_blank"
              className="text-primary-500 underline"
              href="https://www.facebook.com/settings/?tab=linked_profiles&setting_id=linked_profiles_instagram"
            >
              Instagram connection link
            </a>
            .
          </div>
        </AccountStepItem>

        <AccountStepItem index="4">
          <>
            After linking, click the{" "}
            <span className="font-medium text-textPrimary-900">Done</span>{" "}
            button below. We&apos;ll recheck your Instagram profile.
          </>
        </AccountStepItem>

        <div className="text-center">
          <Button
            onClick={async () => {
              setIsRefreshing(true);
              await utils.instagram.getInstagramAccounts.invalidate();
              setIsRefreshing(false);
              setCurrentStep(ADD_ACCOUNTS_STEPS.SELECT_PAGES);
            }}
            disabled={isRefreshing}
            className="mx-auto w-64 bg-primary-500 px-0 text-white shadow"
            icon={<CheckIcon width={20} height={20} />}
            label={isRefreshing ? "Checking..." : "Done"}
          />
        </div>
      </div>

      <div className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-textPrimary-900">
              Facebook Pages we found
            </h2>
            <p className="text-sm text-textPrimary-700">
              If your page isn’t listed, try refreshing or{" "}
              <a
                className="text-primary-500 underline"
                target="_blank"
                href="https://www.facebook.com/pages/creation"
              >
                create a new page
              </a>
              .
            </p>
          </div>

          <Button
            onClick={async () => {
              setIsRefreshing(true);
              await utils.instagram.getFacebookUnconnectedPages.invalidate();
              setIsRefreshing(false);
            }}
            disabled={isRefreshing}
            className="rounded-full text-primary-600 shadow-sm"
            icon={
              <ArrowPathIcon
                width={16}
                height={16}
                className={isRefreshing ? "animate-spin" : ""}
              />
            }
          />
        </div>

        <div className="mt-4 space-y-4">
          {facebookAccounts.length === 0 ? (
            <p className="text-sm text-gray-500">No pages found.</p>
          ) : (
            facebookAccounts.map((fb) => (
              <div
                key={fb.name}
                className="flex items-center justify-between rounded border border-gray-200 bg-white px-4 py-3 shadow-sm"
              >
                <div className="font-semibold text-textPrimary-900">
                  {fb.name}
                </div>
                <a
                  target="_blank"
                  className="rounded bg-white px-3 py-2 shadow hover:bg-gray-50"
                  href={`https://facebook.com/profile.php?id=${fb.id}`}
                >
                  <ArrowsRightLeftIcon className="size-4 text-primary-600" />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
