import { useState } from "react";
import { AddAccountsConnectPageCreatePage } from "~/components/accounts/AddAccountsConnectPageCreatePage";
import { AddAccountsConnectPageNewPage } from "~/components/accounts/AddAccountsConnectPageNewPage";
import { AddAccountsPageNameInputForm } from "~/components/accounts/AddAccountsPageNameInputForm";

interface AccountOnboardingConnectPageProps {
  onClose: () => void;
}

export const AccountOnboardingConnectPage = ({
  onClose,
}: AccountOnboardingConnectPageProps) => {
  const [step, setStep] = useState(0);
  const [connectingName, setConnectingName] = useState("");

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  return (
    <div className="space-y-4">
      {step === 0 && (
        <AddAccountsPageNameInputForm
          connectingName={connectingName}
          setConnectingName={setConnectingName}
          setCurrentStep={() => setStep(1)}
        />
      )}

      {step === 1 && (
        <AddAccountsConnectPageNewPage
          connectingName={connectingName}
          setCurrentStep={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <AddAccountsConnectPageCreatePage
          connectingName={connectingName}
          setCurrentStep={handleClose}
        />
      )}
    </div>
  );
};
