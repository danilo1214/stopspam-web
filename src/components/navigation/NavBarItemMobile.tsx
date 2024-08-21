import Link from "next/link";
import { type NavigationItem } from "~/components/navigation/NavBar";

export const NavBarItemMobile = ({ item }: { item: NavigationItem }) => {
  return (
    <Link href={item.link}>
      <div className="w-full rounded-md px-4 py-2 text-textPrimary-800 hover:text-textPrimary-700 focus:outline-none dark:text-textPrimary-100   dark:hover:text-textPrimary-200 ">
        {item.label}
      </div>
    </Link>
  );
};
