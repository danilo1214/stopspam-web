interface AccountOnboardingHeaderProps {
  step: number;
  totalSteps: number;
}

export const AccountOnboardingHeader = ({
  step,
  totalSteps,
}: AccountOnboardingHeaderProps) => {
  return (
    <div className="mt-8 text-center">
      <h2 className="text-sm uppercase tracking-wide text-gray-500">
        Step {step + 1} of {totalSteps}
      </h2>
      <h1 className="mt-2 text-3xl font-semibold">Let’s set up your account</h1>
    </div>
  );
};
