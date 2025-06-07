import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AccountItem } from "~/components/accounts/AccountItem";
import { ADD_ACCOUNTS_STEPS } from "~/components/accounts/accounts.types";
import AddAccounts from "~/components/accounts/AddAccounts";
import Button from "~/components/generic/Button";
import { Modal } from "~/components/generic/Modal";
import { useMeta } from "~/hooks/useMeta";
import { api } from "~/utils/api";

interface AccountListProps {
  hasSubscription?: boolean;
}

export const AccountList = ({ hasSubscription }: AccountListProps) => {
  const utils = api.useUtils();

  /**
   * Mutations
   */
  const { mutateAsync: syncPages } = api.instagram.syncPages.useMutation();

  /**
   * Queries
   */
  const { instagramPages, savedPages, savedPagesIds } = useMeta();

  /**
   * States
   */
  const [showModalButtons, setShowModalButtons] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] =
    useState<string[]>(savedPagesIds);

  /**
   * Effects
   */
  useEffect(() => {
    setSelectedAccounts(savedPagesIds);
  }, [savedPagesIds]);

  /**
   * Functions
   */
  const savePages = async () => {
    if (instagramPages) {
      const toSync = instagramPages.filter((p) =>
        selectedAccounts.includes(p.id),
      );
      await syncPages({ pages: toSync });
      setOpen(false);
      await utils.instagram.getSavedPages.invalidate();
      toast("Successfully synced pages");
    }
  };

  return (
    <div className="my-5 flex flex-col gap-y-1">
      <Modal
        showActionButtons={showModalButtons}
        title="Add Accounts"
        description="Connect your Instagram accounts to Reply Master."
        open={open}
        onConfirm={() => savePages()}
        onClose={() => setOpen(false)}
      >
        {" "}
        <AddAccounts
          onStepChange={(s) => {
            if (s === ADD_ACCOUNTS_STEPS.SELECT_PAGES) {
              setShowModalButtons(true);
            } else {
              setShowModalButtons(false);
            }
          }}
          instagramAccounts={instagramPages ?? []}
          selectedAccounts={selectedAccounts}
          setSelectedAccounts={(v) => setSelectedAccounts(v)}
        />
      </Modal>

      <div className="flex items-center">
        <div className="flex w-full justify-between align-middle">
          <div className="text-lg text-textPrimary-900">
            Your connected pages
          </div>

          {hasSubscription && (
            <Button
              icon={
                <PlusIcon className="size-5 font-light text-textPrimary-100" />
              }
              label="Add"
              className="mb-4 rounded-lg bg-primary-600 px-4 py-2  text-white shadow-md transition duration-200 ease-in-out hover:scale-105 "
              onClick={() => setOpen(true)}
            ></Button>
          )}
        </div>
      </div>

      {(!savedPages || savedPages.length === 0) && (
        <div className="text-md my-8 text-center text-textPrimary-700">
          You don&apos;t have any connected pages
        </div>
      )}
      {savedPages?.map((p, idx) => <AccountItem key={idx} instagramPage={p} />)}
    </div>
  );
};
