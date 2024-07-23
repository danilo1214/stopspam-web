import classNames from "classnames";
import { Fragment, useEffect, useRef, useState } from "react";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { InstagramPage } from "@prisma/client";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import Link from "next/link";

export interface AccountItemProps {
  instagramPage: InstagramPage;
}

export const AccountItem: React.FC<AccountItemProps> = ({ instagramPage }) => {
  const utils = api.useUtils();
  const { mutateAsync: deletePage } = api.instagram.deletePage.useMutation();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Link
      href={`/pages/${instagramPage.id}`}
      className={classNames(
        "relative mb-2 flex items-center justify-between rounded-lg bg-textPrimary-100 p-4",
      )}
    >
      <div className="flex items-center space-x-3">
        <img
          src={instagramPage.profilePictureUrl}
          alt={instagramPage.username}
          className="h-12 w-12 rounded-full object-cover"
        />
        <span>{instagramPage.username}</span>
      </div>
      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
          }}
          className="flex items-center "
        >
          <Cog6ToothIcon className="size-5 font-light text-gray-700 hover:text-gray-900 focus:outline-none" />
        </button>
        <Transition
          show={menuOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute right-[-50px] z-10 mt-2 w-48 rounded border bg-white shadow-lg">
            <button
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await deletePage({ id: instagramPage.id });
                utils.instagram.getSavedPages.invalidate();
                toast("Successfully removed page");
              }}
            >
              Remove Page
            </button>
          </div>
        </Transition>
      </div>
    </Link>
  );
};
