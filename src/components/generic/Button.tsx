import React from "react";
import classNames from "classnames";

type ButtonProps = {
  label?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit";
};

export default function Button({
  label,
  className,
  onClick,
  disabled,
  icon,
  type,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={classNames(
        "flex items-center justify-center space-x-2 rounded px-8 py-2",
        className,
        {
          "cursor-not-allowed opacity-50": disabled,
        },
      )}
      {...rest}
      onClick={onClick}
    >
      {icon && <span className={classNames(label && "mr-2")}>{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
}
