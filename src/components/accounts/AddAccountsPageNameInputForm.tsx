import { ADD_ACCOUNTS_STEPS } from "~/components/accounts/accounts.types";
import Button from "~/components/generic/Button";

export const AddAccountsPageNameInputForm = ({
  connectingName,
  setConnectingName,
  setCurrentStep,
}: {
  connectingName: string;
  setConnectingName: (name: string) => void;
  setCurrentStep: (step: ADD_ACCOUNTS_STEPS) => void;
}) => {
  return (
    <form
      className="space-y-1"
      onSubmit={() => {
        setCurrentStep(ADD_ACCOUNTS_STEPS.CONNECT_PAGE_SELECTION_NEW_PAGE);
      }}
    >
      <p className="font-semibold">What is the instagram profile name?</p>
      <input
        value={connectingName}
        onChange={(e) => setConnectingName(e.target.value)}
        className="w-full shadow"
        placeholder="Enter your instagram @"
      />
      <Button
        type="submit"
        className=" bg-primary-600 px-0 text-white"
        label="Next"
      />
    </form>
  );
};
