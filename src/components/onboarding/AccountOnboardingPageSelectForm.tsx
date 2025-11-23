import CustomSelect from "~/components/generic/Select";
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

  return (
    <div>
      <div>Select your page</div>

      <CustomSelect
        options={selectOptions}
        canSelectSearch
        onOptionChange={(v) => onSelectAccount(v)}
        value={selectedAccount}
      />
    </div>
  );
};
