import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import classNames from "classnames";
import { Fragment } from "react";
import { useBreakpoint } from "~/hooks/media";
import Button from "./Button";
import Image from "next/image";
import { useRouter } from "next/router";

const navigation: NavigationItem[] = [
  { label: "Home", link: "/" },
  { label: "Pricing", link: "/pricing" },
  { label: "How it works?", link: "/how-it-works" },
];

const UserMenu = ({ image }: { image?: string | null }) => {
  const router = useRouter();
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
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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

          <MenuItem>
            {(pageProps) => (
              <Link
                href="/account"
                className={classNames(
                  pageProps.focus ? "bg-gray-100" : "",
                  "block w-full px-4 py-2",
                )}
              >
                Account
              </Link>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

const SignInButton = () => {
  return (
    <div className="relative rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-1  transition duration-100 hover:scale-105 hover:from-primary-400 hover:to-secondary-400">
      <Button
        label="Get Started"
        onClick={() => signIn()}
        className="w-full rounded-full bg-white text-center text-textPrimary-800"
      />
    </div>
  );
};

export interface NavigationItem {
  label: string;
  link: string;
}

export default function Navbar({ ...props }) {
  const { isLargeScreen, isMediumScreen } = useBreakpoint();
  const { data } = useSession();

  return (
    <div className="w-full" {...props}>
      <nav className="container relative mx-auto flex flex-wrap items-center justify-between p-8 lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex w-full  flex-wrap items-center lg:w-auto lg:justify-between">
                <Link href="/">
                  <div className="flex items-center space-x-2 text-2xl font-medium text-primary-800 dark:text-gray-100">
                    <span></span>
                    <span>InstaAdmin</span>
                  </div>
                </Link>

                {data?.user && isMediumScreen && (
                  <UserMenu image={data?.user.image} />
                )}

                <DisclosureButton
                  aria-label="Toggle Menu"
                  className={classNames(
                    "dark:focus:bg-trueGray-700 ml-5 rounded-md px-2 py-1 text-gray-500 hover:text-primary-500 focus:bg-primary-100 focus:text-secondary-500 focus:outline-none lg:hidden dark:text-gray-300",
                    !data?.user && "ml-auto",
                  )}
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </DisclosureButton>

                <DisclosurePanel className="my-5 flex w-full flex-col flex-wrap text-center lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link key={index} href={item.link}>
                        <div className="dark:focus:bg-trueGray-700  w-full rounded-md px-4 py-2 text-gray-500 hover:text-primary-500 focus:bg-primary-100 focus:text-secondary-500 focus:outline-none dark:text-gray-300">
                          {item.label}
                        </div>
                      </Link>
                    ))}

                    {data?.user ? <></> : <SignInButton />}
                  </>
                </DisclosurePanel>
              </div>
            </>
          )}
        </Disclosure>

        {isLargeScreen && (
          <div className="ml-auto flex items-center justify-between text-center">
            <ul className="flex-1 list-none items-center justify-end pt-6 lg:flex lg:pt-0">
              {navigation.map((item, index) => (
                <li className="nav__item mr-3" key={index}>
                  <Link href={item.link}>
                    <div className="inline-block rounded-md px-4 py-2 text-lg font-normal text-gray-800 no-underline hover:text-primary-500 focus:bg-primary-100 focus:text-secondary-500 focus:outline-none dark:text-gray-200">
                      {item.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {data?.user && <UserMenu image={data?.user.image} />}
          </div>
        )}

        <div className="nav__item mr-3 hidden items-center space-x-3 align-middle lg:flex">
          {!data?.user && <SignInButton />}
        </div>
      </nav>
    </div>
  );
}
