export const AccountStepItem = ({
  index,
  children,
}: {
  index: string;
  children: React.ReactElement | string;
}) => {
  return (
    <div className="flex w-full content-center content-between items-center justify-center space-x-5 align-middle">
      <div className="flex size-7 items-center justify-center rounded-full bg-textPrimary-200 text-center align-middle">
        <div className="text-textSecondary-800">{index}</div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
