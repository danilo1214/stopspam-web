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
      return "bg-secondary-600/90";
    }

    if (type === "warning") {
      return "bg-orange-500/80";
    }

    return "bg-primary-600/90";
  }, [type]);

  return (
    <span
      {...props}
      className={classNames(
        "mb-1 rounded-full px-3 text-textPrimary-100",
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
