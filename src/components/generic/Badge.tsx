import classNames from "classnames";
import { useMemo } from "react";

export function Badge({
  className,
  label,
  type = "success",
  ...props
}: {
  className?: string;
  label: string;
  type?: "success" | "error" | "warning";
}) {
  const color: string = useMemo(() => {
    if (type === "error") {
      return "bg-secondary-500/80";
    }

    if (type === "warning") {
      return "bg-orange-500/80";
    }

    return "bg-tertiary-600/90";
  }, [type]);

  return (
    <span
      {...props}
      className={classNames(
        "rounded-md px-2 py-1 text-textPrimary-100",
        color,
        className,
      )}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <span
        className="mr-1 h-1 w-1 rounded-full bg-white"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      ></span>
      {label}
    </span>
  );
}
