import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ADD_ACCOUNTS_STEPS } from "~/components/accounts/accounts.types";
import Button from "~/components/generic/Button";

export const AddAccountsConnectPageCreatePage = ({
  connectingName,
  setCurrentStep,
}: {
  connectingName: string;
  setCurrentStep: (step: ADD_ACCOUNTS_STEPS) => void;
}) => {
  return (
    <div>
      <h1 className="text-md font-semibold">
        Just one last step. Let&apos;s create a new Facebook Business Page and
        connect it to @{connectingName}
      </h1>

      <p className="text-sm font-light">
        Connection to Facebook page is required to build automations with
        Instagram.
      </p>

      <div className="my-10 flex flex-col gap-y-5">
        <div className="flex w-full content-between justify-between space-x-5 align-middle">
          <div className="size-10 rounded-full bg-textPrimary-200 text-center">
            1
          </div>
          <div className="flex-1">
            To link @{connectingName} to a Facebook Page, let&apos;s create a
            Facebook Page first. It will only take 1 minute. Open this link to{" "}
            <a
              href="https://facebook.com/pages/create/?ref_type=universal_creation_hub"
              className="text-tertiary-700"
            >
              Facebook: &quot;Create a Page&quot;
            </a>
          </div>
        </div>

        <div className="flex w-full content-between justify-between space-x-5 align-middle">
          <div className="size-10 rounded-full bg-textPrimary-200 text-center">
            2
          </div>
          <div className="flex-1">
            Once you are done click Refresh.
            <Button
              onClick={() => setCurrentStep(ADD_ACCOUNTS_STEPS.SELECT_PAGES)}
              className="px-0 text-primary-600 shadow"
              icon={<ArrowPathIcon width={20} height={20} />}
              label="Refresh"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
