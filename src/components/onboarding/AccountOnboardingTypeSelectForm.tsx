import CustomSelect from "~/components/generic/Select";
import { InstagramPageType } from "@prisma/client";
import { businesses, niches } from "~/const";

interface AccountOnboardingBusinessAndSubtypeSelectProps {
  pageType: InstagramPageType | null;
  subType: string | null;
  onSelectSubType: (v: string) => void;
  onSelectType: (v: InstagramPageType) => void;
}

export const AccountOnboardingBusinessAndSubtypeSelect = ({
  pageType,
  subType,
  onSelectSubType,
  onSelectType,
}: AccountOnboardingBusinessAndSubtypeSelectProps) => {
  if (!pageType) return <div>Please select a page type first.</div>;

  const isBusiness = pageType === InstagramPageType.BUSINESS;

  return (
    <div className="space-y-4">
      {/* Page Type Selector */}
      <div>
        <label className="text-textPrimary-900">Profile Type</label>
        <div className="mb-2 text-sm text-textPrimary-600">
          Choose whether your account is a business or creator
        </div>
        <CustomSelect
          options={[
            { label: "Business", value: InstagramPageType.BUSINESS },
            { label: "Creator", value: InstagramPageType.CREATOR },
          ]}
          value={pageType}
          onOptionChange={(v) => onSelectType(v as InstagramPageType)}
        />
      </div>

      {/* Subtype / Niche Selector */}
      <div>
        <label className="text-textPrimary-900">
          {isBusiness ? "Business Type" : "Niche"}
        </label>
        <div className="mb-2 text-sm text-textPrimary-600">
          {isBusiness
            ? "What type of business do you own?"
            : "What niche best describes you?"}
        </div>
        <CustomSelect
          options={isBusiness ? businesses : niches}
          value={subType ?? undefined}
          canSelectSearch
          onOptionChange={onSelectSubType}
        />
      </div>
    </div>
  );
};
