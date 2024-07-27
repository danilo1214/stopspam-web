import React from "react";

interface OnlineStatusProps {
  isOnline: boolean;
}

export const OnlineStatus: React.FC<OnlineStatusProps> = ({ isOnline }) => {
  return (
    <span
      className={`h-2 w-2 rounded-full ${
        isOnline
          ? " bg-gradient-to-tr from-emerald-200/75 to-emerald-600/75"
          : "bg-textPrimary-600"
      }`}
    ></span>
  );
};
