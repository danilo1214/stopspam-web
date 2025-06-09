import { type ReactElement } from "react";

export function DashboardBox({
  title,
  amount,
  icon,
  amountCap,
}: {
  icon: ReactElement;
  amount: number;
  amountCap?: number;
  title: string;
}) {
  return (
    <div className="shadow-xs flex flex-col rounded-lg  bg-white  p-6  text-3xl text-textPrimary-900 lg:p-14">
      <div className="text-sm text-textPrimary-800">{title}</div>
      <div className="flex items-center gap-x-2">
        {icon}
        {amount} {amountCap && ` / ${amountCap}`}
      </div>
    </div>
  );
}
