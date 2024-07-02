import classNames from "classnames";

type ButtonProps = {
  label: string;
  className: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({
  label,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={classNames("rounded px-8 py-2", className)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
