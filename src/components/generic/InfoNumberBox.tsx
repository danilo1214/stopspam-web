import { LinkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { type ReactElement } from "react";

export const InfoNumberBox = ({
  className,
  number,
  header,
  text,
  icon,
}: {
  className?: string;
  number: number;
  header: string;
  text: string;
  icon?: ReactElement;
}) => {
  return (
    <div
      className={classNames(
        "lg:max-w-124 m-5 flex items-center justify-between gap-x-20 rounded-lg bg-white  px-10 py-10 shadow lg:m-10 lg:m-3 lg:max-w-xl lg:px-20",
        className,
      )}
    >
      <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-tertiary-500 text-white">
        <p>{number}</p>
      </div>

      <div>
        <h2 className="text-textPrimary-900">{header}</h2>
        <div className="my-2 text-textPrimary-700">{text} </div>
      </div>
    </div>
  );
};
