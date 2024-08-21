import Link from "next/link";
import { useRouter } from "next/router";
import { type NavigationItem } from "~/components/navigation/NavBar";

export const NavBarItemWeb = ({ item }: { item: NavigationItem }) => {
  return (
    <li className="nav__item px-1">
      <Link href={item.link}>
        <div className="inline-block rounded-md px-4 py-2 font-normal text-textPrimary-800 no-underline hover:text-textPrimary-900 focus:outline-none dark:text-textPrimary-100  dark:hover:text-textPrimary-300">
          {item.label}
        </div>
      </Link>
    </li>
  );
};
