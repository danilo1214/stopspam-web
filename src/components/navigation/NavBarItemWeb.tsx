import Link from "next/link";
import { useRouter } from "next/router";
import { type NavigationItem } from "~/components/navigation/NavBar";

export const NavBarItemWeb = ({ item }: { item: NavigationItem }) => {
  return (
    <li className="nav__item dark px-1">
      <Link href={item.link}>
        <div className="inline-block rounded-md px-4 py-2 font-normal  text-textPrimary-100 no-underline hover:text-textPrimary-300 focus:bg-primary-100 focus:text-secondary-500 focus:outline-none">
          {item.label}
        </div>
      </Link>
    </li>
  );
};
