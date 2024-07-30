import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AccountItem } from "~/components/accounts/AccountItem";
import AddAccounts from "~/components/accounts/AddAccounts";
import Button from "~/components/generic/Button";
import { Modal } from "~/components/generic/Modal";
import { Skeleton } from "~/components/generic/Skeleton";
import { api } from "~/utils/api";

export const AccountList = () => {
  const utils = api.useUtils();

  const { data: instagramAccounts, isLoading: isInstagramAccountsLoading } =
    api.instagram.getInstagramAccounts.useQuery(undefined, {
      // 5 mins
      staleTime: 300 * 1000,
    });
  const { mutateAsync: syncPages } = api.instagram.syncPages.useMutation();
  const { data: savedPages, isLoading: isGetSavedPagesLoading } =
    api.instagram.getSavedPages.useQuery();

  /** States */
  const [open, setOpen] = useState(false);
  const savedPagesIds = savedPages?.map((page) => page.instagramId) ?? [];
  const [selectedAccounts, setSelectedAccounts] =
    useState<string[]>(savedPagesIds);

  useEffect(() => {
    setSelectedAccounts(savedPagesIds);
  }, [savedPages]);

  const isLoading = isGetSavedPagesLoading || isInstagramAccountsLoading;

  const savePages = async () => {
    if (instagramAccounts) {
      const toSync = instagramAccounts.filter((p) =>
        selectedAccounts.includes(p.id),
      );
      await syncPages({ pages: toSync });
      setOpen(false);
      utils.instagram.getSavedPages.invalidate();
      toast("Successfully synced pages");
    }
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="mx-auto h-full max-w-3xl rounded-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between align-middle">
          <div className="mb-2 text-lg">Accounts</div>
          <Modal
            title="Add Accounts"
            description="Connect your Instagram accounts to Reply Master."
            open={open}
            onConfirm={() => savePages()}
            onClose={() => setOpen(false)}
          >
            {" "}
            <AddAccounts
              selectedAccounts={selectedAccounts}
              setSelectedAccounts={(v) => setSelectedAccounts(v)}
              accounts={instagramAccounts ?? []}
            />
          </Modal>
          <Button
            icon={
              <PlusIcon className="size-5 font-light text-textPrimary-100" />
            }
            label="Add"
            className="mb-4 rounded-lg bg-primary-600 px-4 py-2 font-bold text-white shadow-md transition duration-200 ease-in-out hover:scale-105 "
            onClick={() => setOpen(true)}
          ></Button>
        </div>
        <div className="mt-6">
          {savedPages?.length ? (
            savedPages.map((page, index) => (
              <AccountItem key={index} instagramPage={page} />
            ))
          ) : (
            <div className="text-center text-lg text-textPrimary-900">
              No pages connected yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
