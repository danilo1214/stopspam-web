import Link from "next/link";
import { type NavigationItem } from "~/components/navigation/NavBar";

export const NavBarItemWeb = ({ item }: { item: NavigationItem }) => {
  return (
    <li className="nav__item px-1">
      <Link href={item.link}>
        <div className="inline-block rounded-md px-4 py-2 font-normal text-gray-800 no-underline hover:text-primary-500 focus:bg-primary-100 focus:text-secondary-500 focus:outline-none dark:text-gray-200">
          {item.label}
        </div>
      </Link>
    </li>
  );
};
