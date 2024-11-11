import { type ReactNode } from "react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";

export function Modal({
  onClose,
  onConfirm,
  open,
  children,
  title,
  description,
  showActionButtons = true,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
  title: string;
  description: string;
  showActionButtons?: boolean;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="px-5 py-3">
              <div className="text-lg font-semibold text-textPrimary-900">
                {title}
              </div>
              <div className="text-textPrimary-700">{description}</div>
            </div>

            <div className="px-7 py-8">{children}</div>
            {showActionButtons && (
              <div className="gap-x-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => onConfirm()}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700 sm:mt-0 sm:w-auto"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="inline-flex w-full justify-center rounded-md bg-white  px-3 py-2 text-sm font-semibold text-textPrimary-900 hover:bg-gray-100  sm:ml-3 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
