export const Skeleton = () => {
  return (
    <div className="h-full max-w-xl animate-pulse rounded-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between align-middle">
          <div className="mb-2 h-6 w-32 rounded bg-gray-300"></div>
          <div className="mb-4 h-10 max-w-[100px] rounded-lg bg-gray-300"></div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-300"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 rounded bg-gray-300"></div>
                <div className="h-4 w-5/6 rounded bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
