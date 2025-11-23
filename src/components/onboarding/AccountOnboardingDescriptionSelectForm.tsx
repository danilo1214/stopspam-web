import Button from "~/components/generic/Button";

interface AccountOnboardingDescriptionSelectProps {
  description: string;
  onChangeDescription: (t: string) => void;
  onSave?: () => void; // optional (if you want a button inside)
}

export const AccountOnboardingDescriptionSelect = ({
  description,
  onChangeDescription,
  onSave,
}: AccountOnboardingDescriptionSelectProps) => {
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

          {onSave && (
            <Button
              onClick={onSave}
              label="Save"
              className="mt-2 w-full rounded-md bg-primary-600 p-3 text-white hover:bg-primary-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};
