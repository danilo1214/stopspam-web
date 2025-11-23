import { Slider } from "~/components/generic/Slider";
import { vibes } from "~/const";

interface AccountOnboardingVibeSelectProps {
  vibe: number;
  onChangeVibe: (v: number) => void;
}

export const AccountOnboardingVibeSelect = ({
  vibe,
  onChangeVibe,
}: AccountOnboardingVibeSelectProps) => {
  return (
    <div>
      <div className="mb-2">
        <label className="text-textPrimary-900">Comment tone</label>
        <div className="text-sm text-textPrimary-600">
          Select the tone of your comments.
        </div>
      </div>

      <Slider value={vibe} onChange={onChangeVibe} labels={vibes} />
    </div>
  );
};
