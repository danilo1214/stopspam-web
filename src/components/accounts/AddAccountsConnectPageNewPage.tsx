import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ADD_ACCOUNTS_STEPS } from "~/components/accounts/accounts.types";
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
        Let&apos;s connect @{connectingName} to your Facebook Page.
      </h1>

      <div className="my-10 flex flex-col gap-y-5">
        <div className="flex w-full content-between justify-between space-x-5 align-middle">
          <div className="size-10 rounded-full bg-textPrimary-200 text-center">
            1
          </div>
          <div className="flex-1">Select a page from the list.</div>
        </div>

        <div className="flex w-full content-between justify-between space-x-5 align-middle">
          <div className="size-10 rounded-full bg-textPrimary-200 text-center">
            2
          </div>
          <div className="flex-1">Go to Settings, select Instagram.</div>
        </div>

        <div className="flex w-full content-between justify-between space-x-5 align-middle">
          <div className="size-10 rounded-full bg-textPrimary-200 text-center">
            3
          </div>
          <div className="flex-1">
            Connect your Instagram page to the facebook page.
            <a
              className="text-primary-500"
              href="https://www.facebook.com/settings/?tab=linked_profiles&setting_id=linked_profiles_instagram"
            >
              {" "}
              Connect Instagram
            </a>
          </div>
        </div>

        <div className="flex w-full content-between justify-between space-x-5 align-middle">
          <div className="size-10 rounded-full bg-textPrimary-200 text-center">
            4
          </div>
          <div className="flex-1">
            Once you are done click Refresh.
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
        </div>
      </div>

      <div className="my-10 gap-y-0">
        {facebookAccounts.map((fb) => (
          <div key={fb.name} className=" flex items-center justify-between">
            <div className="h-full font-semibold">{fb.name}</div>
            <a
              className="my-5 rounded-md bg-primary-600 px-5 py-2 text-white"
              href={`https://facebook.com/profile.php?id=${fb.id}`}
            >
              Connect Page
            </a>
          </div>
        ))}
      </div>

      <Button
        onClick={() => setCurrentStep(ADD_ACCOUNTS_STEPS.SELECT_PAGES)}
        className="px-0 text-primary-600 shadow"
        icon={<PlusIcon width={20} height={20} />}
        label="Create new Facebook Page"
      />
    </div>
  );
};
