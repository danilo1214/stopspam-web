import Button from "~/components/generic/Button";
import { placeholderDescriptions } from "~/const";

interface AccountOnboardingDescriptionSelectProps {
  description: string;
  selectedSubType?: string;
  onChangeDescription: (t: string) => void;
}

export const AccountOnboardingDescriptionSelect = ({
  description,
  onChangeDescription,
  selectedSubType,
}: AccountOnboardingDescriptionSelectProps) => {
  const handleDescriptionCtaClick = async () => {
    const value =
      selectedSubType && placeholderDescriptions[selectedSubType]
        ? placeholderDescriptions[selectedSubType]
        : "";

    onChangeDescription(value);
  };

  return (
    <div>
      <div className="mb-2">
        <label className="text-textPrimary-900">Brief description</label>
        <div className="text-sm text-textPrimary-600">
          Describe your business in a few sentences.
        </div>
      </div>

      <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50">
        <div className="rounded-t-lg bg-white p-2">
          <textarea
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            rows={5}
            className="w-full border-0 bg-white px-2 pt-1 text-gray-900 focus:outline-none"
            placeholder="Enter a description..."
          />

          <Button
            onClick={handleDescriptionCtaClick}
            label={"💡 Auto-Fill Example"}
            className="focus:shadow-outline  rounded-md bg-primary-600   p-3 text-white transition duration-150 ease-in-out hover:bg-primary-500 focus:outline-none lg:w-64"
          ></Button>
        </div>
      </div>
    </div>
  );
};
