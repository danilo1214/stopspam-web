import { CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { ADD_ACCOUNTS_STEPS } from "~/components/accounts/accounts.types";
import { AccountStepItem } from "~/components/accounts/AccountStepItem";
import Button from "~/components/generic/Button";
import { type FbPageResult } from "~/server/api/services/instagram";
import { api } from "~/utils/api";

export const AddAccountsConnectPageNewPage = ({
  connectingName,
  setCurrentStep,
}: {
  connectingName: string;
  setCurrentStep: (step: ADD_ACCOUNTS_STEPS) => void;
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const utils = api.useUtils();

  return (
    <div className="space-y-6">
      <div className="text-sm text-textPrimary-700">
        <h1 className="text-xl font-semibold text-textPrimary-800">
          Connect Instagram account @{connectingName} to a Facebook Page
        </h1>
        <p className="mt-2">
          To enable automation features on an Instagram account:
        </p>

        <p className="pl-1">
          - It must be either a Business or Creator account.
        </p>
        <p className="pl-1">- It must be linked to a Facebook Page.</p>
      </div>

      <div className="space-y-4 text-sm text-textPrimary-700">
        <AccountStepItem index="1">Create a new Facebook Page</AccountStepItem>

        <AccountStepItem index="2">
          <div>
            <a
              target="_blank"
              className="text-primary-500 underline"
              href="https://www.facebook.com/business/help/connect-instagram-to-page"
            >
              Connect
            </a>{" "}
            the page to your Instagram account.
          </div>
        </AccountStepItem>

        <AccountStepItem index="3">
          <>
            After linking, click the{" "}
            <span className="font-medium text-textPrimary-900">Done</span>{" "}
            button below. We&apos;ll recheck your Instagram account.
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
    </div>
  );
};
