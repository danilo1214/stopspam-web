import Link from "next/link";
import { type NavigationItem } from "~/components/navigation/NavBar";

export const NavBarItemMobile = ({ item }: { item: NavigationItem }) => {
  return (
    <Link href={item.link}>
      <div className="dark:focus:bg-trueGray-700  w-full rounded-md px-4 py-2 text-textPrimary-100 hover:text-textPrimary-300   focus:outline-none ">
        {item.label}
      </div>
    </Link>
  );
};
