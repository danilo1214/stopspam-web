import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import {
  DevicePhoneMobileIcon,
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const routes: { label: string; link: string; icon: React.ReactElement }[] = [
  {
    label: "Home",
    link: "/app",
    icon: <HomeIcon className="size-6 text-center " />,
  },
  {
    label: "Connect Pages",
    link: "/connect",
    icon: <PlusCircleIcon className="size-6 text-center " />,
  },
  {
    label: "Account",
    link: "/account",
    icon: <UserIcon className="size-6 text-center " />,
  },
];

export const BottomBar = () => {
  const rout = useRouter();
  const { data } = useSession();

  return (
    data?.user && (
      <div className="fixed bottom-0 flex max-h-[10%] w-full justify-between  bg-white py-2 text-center text-textPrimary-800">
        {routes.map((r, index) => (
          <Link
            className={classNames(
              "key flex flex-col items-center px-4 font-light",
              rout.pathname === r.link && " font-normal text-primary-600",
            )}
            key={index}
            href={r.link}
          >
            {r.icon}
            <div>{r.label}</div>
          </Link>
        ))}
      </div>
    )
  );
};
