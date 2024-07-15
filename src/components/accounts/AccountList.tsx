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

  /** Queries */

  const { mutate: cron } = api.cronRouter.job.useMutation();
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
    <div className="mx-auto h-full max-w-xl rounded-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between align-middle">
          <div className="mb-2 text-xl font-bold">Accounts</div>
          <Modal
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
            className="mb-4 max-w-[100px] rounded-lg bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700"
            onClick={() => setOpen(true)}
          ></Button>

          <Button
            icon={
              <PlusIcon className="size-5 font-light text-textPrimary-100" />
            }
            label="CRON"
            className="mb-4 max-w-[100px] rounded-lg bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700"
            onClick={() => cron({ secret: "123" })}
          ></Button>
        </div>
        <div className="space-y-4">
          {savedPages?.length ? (
            savedPages.map((page, index) => (
              <AccountItem key={index} instagramPage={page} />
            ))
          ) : (
            <div className="text-center text-lg font-semibold text-textPrimary-900">
              No pages yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
