import Link from "next/link";
import { type NavigationItem } from "~/components/navigation/NavBar";

export const NavBarItemMobile = ({ item }: { item: NavigationItem }) => {
  return (
    <Link href={item.link}>
      <div className="dark:focus:bg-trueGray-700  w-full rounded-md px-4 py-2 text-gray-500 hover:text-primary-500 focus:bg-primary-100 focus:text-secondary-500 focus:outline-none dark:text-gray-300">
        {item.label}
      </div>
    </Link>
  );
};
