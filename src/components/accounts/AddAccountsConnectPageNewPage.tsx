import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ArrowsRightLeftIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { type ADD_ACCOUNTS_STEPS } from "~/components/accounts/accounts.types";
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
      <h1 className=" text-textPrimary-800">
        Let&apos;s connect{" "}
        <span className="text-textPrimary-900">@{connectingName}</span> to a
        Facebook Page.
      </h1>

      <div className="my-4 flex flex-col gap-y-3 text-sm text-textPrimary-700">
        <AccountStepItem index="1">
          Pick a page from the list below, or create a new page.
        </AccountStepItem>

        <AccountStepItem index="2">
          Go to the page Settings, search for &quot;Instagram&quot;.
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
            Once you are done click Done, your instagram profile should now
            appear.
          </div>
        </AccountStepItem>

        <Button
          onClick={async () => {
            setIsRefreshing(true);
            await utils.instagram.getInstagramAccounts.invalidate();
            setIsRefreshing(false);
            setCurrentStep(ADD_ACCOUNTS_STEPS.SELECT_PAGES);
          }}
          disabled={isRefreshing}
          className="mx-auto w-64 bg-primary-500 px-0  text-white shadow"
          icon={<CheckIcon width={20} height={20} />}
          label="Done"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between align-middle">
          <div>
            <h1 className="text-lg text-textPrimary-900">Pages we found</h1>
            <p className="text-sm text-textPrimary-700">
              You can also{" "}
              <a
                className="   text-primary-500 "
                target="_blank"
                href="https://www.facebook.com/pages/creation"
              >
                create a new page.
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
              className=" rounded-full text-primary-600  shadow-sm"
              icon={<ArrowPathIcon width={14} height={14} />}
            />
          </div>
        </div>

        {facebookAccounts.map((fb) => (
          <div key={fb.name} className="my-5 flex items-center justify-between">
            <div className="h-full font-semibold">{fb.name}</div>
            <a
              target="_blank"
              className=" bg-white px-5 py-2 shadow "
              href={`https://facebook.com/profile.php?id=${fb.id}`}
            >
              <ArrowsRightLeftIcon className="size-4 font-light text-primary-600" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
