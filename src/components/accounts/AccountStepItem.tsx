export const AccountStepItem = ({
  index,
  children,
}: {
  index: string;
  children: React.ReactElement | string;
}) => {
  return (
    <div className="flex w-full content-between items-center justify-center justify-between space-x-5 align-middle">
      <div className="flex size-10 items-center justify-center rounded-full bg-textPrimary-200 text-center align-middle">
        <div>{index}</div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
