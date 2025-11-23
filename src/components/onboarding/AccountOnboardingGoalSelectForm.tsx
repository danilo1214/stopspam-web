import CustomSelect from "~/components/generic/Select";
import { goals } from "~/const";

interface AccountOnboardingGoalSelectProps {
  goal: string | null;
  onSelectGoal: (goal: string) => void;
}

export const AccountOnboardingGoalSelect = ({
  goal,
  onSelectGoal,
}: AccountOnboardingGoalSelectProps) => {
  return (
    <div>
      <div className="mb-2">
        <label className="text-textPrimary-900">Goal</label>
        <div className="text-sm text-textPrimary-600">What is your goal?</div>
      </div>

      <CustomSelect
        options={goals}
        value={goal ?? undefined}
        onOptionChange={onSelectGoal}
      />
    </div>
  );
};
