import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function Nudge({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <div className="flex flex-col items-center gap-y-5 text-center">
      <h1 className="text-lg font-semibold">{title}</h1>
      <Link
        className="mb-4  flex max-w-72 items-center  rounded-lg bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700"
        href={link}
      >
        <span>
          <PlusIcon className="size-5 font-light text-white" />
        </span>
        <span>{description}</span>
      </Link>
    </div>
  );
}
