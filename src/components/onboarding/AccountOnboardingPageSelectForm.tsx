import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "~/components/generic/Button";
import CustomSelect from "~/components/generic/Select";
import { AccountOnboardingConnectPage } from "~/components/onboarding/AccountOnboardingConnectPage";
import { type IgPageResult } from "~/server/api/services/instagram";

interface AccountOnboardingPageSelectFormProps {
  selectedAccount: string;
  onSelectAccount: (s: string) => void;
  instagramAccounts: IgPageResult[];
}

export const AccountOnboardingPageSelectForm = ({
  selectedAccount,
  onSelectAccount,
  instagramAccounts,
}: AccountOnboardingPageSelectFormProps) => {
  const selectOptions = instagramAccounts.map((v) => ({
    label: v.username,
    value: v.id,
  }));

  const [help, setHelp] = useState(false);

  return (
    <div>
      <div>Select your page</div>

      {help ? (
        <AccountOnboardingConnectPage onClose={() => setHelp(false)} />
      ) : (
        <>
          <CustomSelect
            options={selectOptions}
            canSelectSearch
            onOptionChange={(v) => onSelectAccount(v)}
            value={selectedAccount}
          />
          <div className="flex gap-x-5">
            <Button
              onClick={() => setHelp(true)}
              className="my-5 flex-1 px-0 text-sm text-primary-600 shadow"
              icon={<PlusIcon width={20} height={20} />}
              label="Add profile"
            />

            <Button
              onClick={() => signIn("facebook")}
              className="my-5 flex-1 px-0 text-sm text-primary-600 shadow"
              icon={<ArrowPathIcon width={20} height={20} />}
              label="Refresh access"
            />
          </div>
        </>
      )}
    </div>
  );
};
