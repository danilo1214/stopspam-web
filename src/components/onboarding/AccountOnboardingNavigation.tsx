import Button from "~/components/generic/Button";

interface AccountOnboardingNavigationProps {
  step: number;
  setStep: (v: number) => void;
  totalSteps: number;
  disabledNext: boolean;
}

export const AccountOnboardingNavigation = ({
  step,
  setStep,
  totalSteps,
  disabledNext,
}: AccountOnboardingNavigationProps) => {
  return (
    <div className="mt-10 flex w-full max-w-xl justify-between">
      <Button
        onClick={() => setStep(Math.max(0, step - 1))}
        disabled={step === 0}
        label="Back"
        className="rounded bg-gray-200 px-4 py-2 disabled:bg-gray-100 disabled:text-gray-400"
      />

      <Button
        onClick={() => setStep(Math.min(totalSteps, step + 1))}
        disabled={disabledNext}
        className="rounded bg-primary-600 px-4 py-2 text-white"
        label="Next"
      />
    </div>
  );
};
