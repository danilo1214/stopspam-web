import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

export function HomeHeader({ pages, name }: { pages: number; name: string }) {
  const { data: sessionData } = useSession();

  return (
    <div>
      <h1 className="text-xl">
        {" "}
        Hello <span className="font-semibold">{name}</span>{" "}
      </h1>
      <div className="mt-2 flex gap-x-5 text-sm lg:max-w-[30%]">
        <div className="flex items-center">
          <UserCircleIcon className="size-5 font-light text-textPrimary-500" />
          <div className="text-textPrimary-900">{pages} Pages Connected</div>
        </div>
      </div>
    </div>
  );
}
