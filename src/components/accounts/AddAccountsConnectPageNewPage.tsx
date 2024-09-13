import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
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
    <div>
      <h1 className="text-md font-semibold">
        Let&apos;s connect @{connectingName} to a Facebook Page.
      </h1>

      <div className="my-4 flex flex-col gap-y-3">
        <AccountStepItem index="1">
          Select a page from the list below. Alternatively you can create a new
          page.
        </AccountStepItem>

        <AccountStepItem index="2">
          Go to the page Settings, search for Instagram.
        </AccountStepItem>

        <AccountStepItem index="3">
          <div>
            Connect your Instagram profile to the facebook page.
            <a
              target="_blank"
              className="text-primary-500"
              href="https://www.facebook.com/settings/?tab=linked_profiles&setting_id=linked_profiles_instagram"
            >
              {" "}
              Connect Instagram
            </a>
          </div>
        </AccountStepItem>

        <AccountStepItem index="4">
          <div>
            Once you are done click Refresh, your instagram profile should now
            appear.
            <Button
              onClick={async () => {
                setIsRefreshing(true);
                await utils.instagram.getInstagramAccounts.invalidate();
                setIsRefreshing(false);
                setCurrentStep(ADD_ACCOUNTS_STEPS.SELECT_PAGES);
              }}
              disabled={isRefreshing}
              className="px-0 text-primary-600 shadow"
              icon={<ArrowPathIcon width={20} height={20} />}
              label="Refresh"
            />
          </div>
        </AccountStepItem>
      </div>

      <div className="my-8 space-y-4">
        <div className="flex items-center justify-between align-middle">
          <div>
            <h1 className=" text-md font-semibold">Facebook pages we found</h1>
            <p className="text-sm">
              You can also{" "}
              <a
                className="   text-primary-500 "
                href="https://www.facebook.com/pages/creation"
              >
                create a new Facebook page.
              </a>
            </p>
          </div>

          <div>
            <Button
              onClick={async () => {
                setIsRefreshing(true);
                await utils.instagram.getFacebookUnconnectedPages.invalidate();
                setIsRefreshing(false);
              }}
              disabled={isRefreshing}
              className=" px-0 text-sm text-primary-600 shadow"
              icon={<ArrowPathIcon width={20} height={20} />}
              label="Refresh"
            />
          </div>
        </div>

        {facebookAccounts.map((fb) => (
          <div key={fb.name} className=" flex items-center justify-between">
            <div className="h-full font-semibold">{fb.name}</div>
            <a
              target="_blank"
              className="rounded-md bg-primary-600 px-5 py-2 text-white"
              href={`https://facebook.com/profile.php?id=${fb.id}`}
            >
              Connect Page
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
