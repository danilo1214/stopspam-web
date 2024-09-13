import {
  ArrowPathIcon,
  Cog6ToothIcon,
  CogIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { ADD_ACCOUNTS_STEPS } from "~/components/accounts/accounts.types";
import Button from "~/components/generic/Button";
import CheckboxSelect from "~/components/generic/CheckboxGroup";
import { type IgPageResult } from "~/server/api/services/instagram";

export const AddAccountsSelectPages = ({
  selectedAccounts,
  instagramAccounts,
  setSelectedAccounts,
  setCurrentStep,
}: {
  selectedAccounts: string[];
  instagramAccounts: IgPageResult[];
  setSelectedAccounts: (selected: string[]) => void;
  setCurrentStep: (step: ADD_ACCOUNTS_STEPS) => void;
}) => {
  return (
    <div>
      <p className="mb-5 text-sm  font-semibold">
        We found {instagramAccounts.length ?? 0} instagram profiles linked with
        Facebook pages managed by you.
      </p>

      <CheckboxSelect
        options={instagramAccounts.map((a) => ({
          label: a.username,
          value: a.id,
        }))}
        selectedOptions={selectedAccounts}
        setSelectedOptions={(v: string[]) => setSelectedAccounts(v)}
      />

      <div className="flex gap-x-5">
        <Button
          onClick={() => setCurrentStep(ADD_ACCOUNTS_STEPS.IG_PAGE_NAME_INPUT)}
          className="my-5 flex-1 px-0 text-sm text-primary-600 shadow"
          icon={<PlusIcon width={20} height={20} />}
          label="Connect another profile"
        />

        <Button
          onClick={() => signIn("facebook")}
          className="my-5 flex-1 px-0 text-sm text-primary-600 shadow"
          icon={<ArrowPathIcon width={20} height={20} />}
          label="Refresh access"
        />
      </div>
    </div>
  );
};
