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
      className="flex flex-col gap-y-2"
      onSubmit={() => {
        setCurrentStep(ADD_ACCOUNTS_STEPS.CONNECT_PAGE_SELECTION_NEW_PAGE);
      }}
    >
      <div className=" text-textPrimary-900">
        What is the Instagram account name?
      </div>
      <input
        value={connectingName}
        onChange={(e) => setConnectingName(e.target.value)}
        className="w-full shadow"
        placeholder="Enter your instagram @"
      />
      <Button
        type="submit"
        className=" w-40 bg-primary-600 px-0 text-white"
        label="Next"
      />
    </form>
  );
};
