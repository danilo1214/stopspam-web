import { ReactElement } from "react";

export function DashboardBox({
  title,
  amount,
  icon,
}: {
  icon: ReactElement;
  amount: number;
  title: string;
}) {
  return (
    <div className="flex flex-col rounded-lg  bg-white   p-16 text-3xl text-textPrimary-900">
      <div className="text-sm">{title}</div>
      <div className="flex items-center gap-x-2">
        {icon}
        {amount}
      </div>
    </div>
  );
}
