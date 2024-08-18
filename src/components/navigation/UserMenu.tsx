import { Menu, MenuItem, MenuItems, Transition } from "@headlessui/react";
import classNames from "classnames";
import { signOut } from "next-auth/react";
import { Fragment } from "react";

export const UserMenu = ({ image }: { image?: string | null }) => {
  return (
    <Menu as="div" className="relative ml-auto flex items-center">
      <div>
        <Menu.Button className="relative flex rounded-full text-sm focus:outline-none ">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>

          <img
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full"
            src={image ?? ""}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1  ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem>
            {(pageProps) => (
              <button
                onClick={() => signOut()}
                className={classNames(
                  pageProps.focus ? "bg-gray-100" : "",
                  "block w-full px-4 py-2",
                )}
              >
                Sign out
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
