import { useState } from "react";
import { ADD_ACCOUNTS_STEPS } from "~/components/accounts/accounts.types";
import { AddAccountsConnectPageCreatePage } from "~/components/accounts/AddAccountsConnectPageCreatePage";
import { AddAccountsConnectPageNewPage } from "~/components/accounts/AddAccountsConnectPageNewPage";
import { AddAccountsPageNameInputForm } from "~/components/accounts/AddAccountsPageNameInputForm";
import { AddAccountsSelectPages } from "~/components/accounts/AddAccountsSelectPages";
import {
  type FbPageResult,
  type IgPageResult,
} from "~/server/api/services/instagram";

export default function AddAccounts({
  instagramAccounts,
  selectedAccounts,
  setSelectedAccounts,
  facebookAccounts,
}: {
  instagramAccounts: IgPageResult[];
  facebookAccounts: FbPageResult[];
  selectedAccounts: string[];
  setSelectedAccounts: (selected: string[]) => void;
}) {
  const [currentStep, setCurrentStep] = useState<ADD_ACCOUNTS_STEPS>(
    ADD_ACCOUNTS_STEPS.SELECT_PAGES,
  );

  const [connectingName, setConnectingName] = useState("");

  return (
    <div>
      {currentStep === ADD_ACCOUNTS_STEPS.SELECT_PAGES && (
        <AddAccountsSelectPages
          instagramAccounts={instagramAccounts}
          selectedAccounts={selectedAccounts}
          setSelectedAccounts={setSelectedAccounts}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep === ADD_ACCOUNTS_STEPS.IG_PAGE_NAME_INPUT && (
        <AddAccountsPageNameInputForm
          connectingName={connectingName}
          setConnectingName={setConnectingName}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep === ADD_ACCOUNTS_STEPS.CONNECT_PAGE_SELECTION_NEW_PAGE && (
        <AddAccountsConnectPageNewPage
          connectingName={connectingName}
          setCurrentStep={setCurrentStep}
          facebookAccounts={facebookAccounts}
        />
      )}

      {currentStep === ADD_ACCOUNTS_STEPS.CONNECT_PAGE_CREATE_PAGE && (
        <AddAccountsConnectPageCreatePage
          setCurrentStep={setCurrentStep}
          connectingName={connectingName}
        />
      )}
    </div>
  );
}
