import CheckboxSelect from "~/components/generic/CheckboxGroup";
import { IgPageResult } from "~/server/api/services/instagram";

export default function AddAccounts({
  accounts,
  selectedAccounts,
  setSelectedAccounts,
}: {
  accounts: IgPageResult[];
  selectedAccounts: string[];
  setSelectedAccounts: (selected: string[]) => void;
}) {
  return (
    <div>
      <CheckboxSelect
        options={accounts.map((a) => ({ label: a.username, value: a.id }))}
        selectedOptions={selectedAccounts}
        setSelectedOptions={(v) => setSelectedAccounts(v)}
      />
    </div>
  );
}
