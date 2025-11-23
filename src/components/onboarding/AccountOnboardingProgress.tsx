interface AccountOnboardingProgressProps {
  progress: number;
}

export const AccountOnboardingProgress = ({
  progress,
}: AccountOnboardingProgressProps) => {
  return (
    <div className="h-1 w-full bg-gray-200">
      <div
        className="h-full bg-primary-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
