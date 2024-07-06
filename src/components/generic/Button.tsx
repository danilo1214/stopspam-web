import React from "react";
import classNames from "classnames";

type ButtonProps = {
  label: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
};

export default function Button({
  label,
  className,
  onClick,
  disabled,
  icon,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={classNames(
        "flex items-center justify-center space-x-2 rounded px-8 py-2",
        className,
        {
          "cursor-not-allowed opacity-50": disabled,
        },
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
