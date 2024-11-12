import { LinkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import Image from "next/image";
import { type ReactElement } from "react";

export const InfoNumberBox = ({
  className,
  number,
  header,
  text,
  icon,
  img,
}: {
  className?: string;
  number: number;
  header: string;
  text: string;
  img: string;
  icon?: ReactElement;
}) => {
  return (
    <div
      className={classNames(
        "m-5 flex flex-col items-center justify-between gap-x-20 rounded-lg bg-white px-10 py-10  shadow lg:m-10 lg:max-w-4xl   lg:flex-row lg:px-20",
        className,
      )}
    >
      <Image width={400} height={600} src={img} alt="add acc" />

      <div>
        <div className="my-4 flex content-center items-center  gap-x-4">
          <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
            <p>{number}</p>
          </div>
          <h2 className="text-textPrimary-900">{header}</h2>
        </div>
        <div className="my-2 text-textPrimary-700">{text} </div>
      </div>
    </div>
  );
};
