import { InstagramPageType } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { AccountOnboardingDescriptionSelect } from "~/components/onboarding/AccountOnboardingDescriptionSelectForm";
import { AccountOnboardingGoalSelect } from "~/components/onboarding/AccountOnboardingGoalSelectForm";
import { AccountOnboardingHeader } from "~/components/onboarding/AccountOnboardingHeader";
import { AccountOnboardingNavigation } from "~/components/onboarding/AccountOnboardingNavigation";
import { AccountOnboardingPageSelectForm } from "~/components/onboarding/AccountOnboardingPageSelectForm";
import { AccountOnboardingProgress } from "~/components/onboarding/AccountOnboardingProgress";
import { AccountOnboardingBusinessAndSubtypeSelect } from "~/components/onboarding/AccountOnboardingTypeSelectForm";
import { AccountOnboardingVibeSelect } from "~/components/onboarding/AccountOnboardingVibeSelectForm";
import { vibes } from "~/const";
import { useMeta } from "~/hooks/useMeta";
import { api } from "~/utils/api";

interface IAccountOnboardingForm {
  selectedAccount: string;
  goal: string;
  vibe: number;
  type: InstagramPageType;
  subType: string;
  description: string;
}

const TOTAL_STEPS = 5; // change whenever you add more

export const AccountOnboardingForm = () => {
  const { mutate: createPage, isPending } =
    api.instagram.createPage.useMutation();

  console.log(isPending);

  const { instagramPages } = useMeta();

  const utils = api.useUtils();

  const [accountonboardingData, setAccountonboardingData] =
    useState<IAccountOnboardingForm>({
      selectedAccount: "",
      goal: "",
      vibe: 0,
      type: InstagramPageType.CREATOR,
      subType: "",
      description: "",
    });

  const [step, setStep] = useState(0);

  const onChangeStep = async (step: number) => {
    if (step === TOTAL_STEPS) {
      const { goal, vibe, type, subType, description, selectedAccount } =
        accountonboardingData;

      const selectedPage = instagramPages?.find(
        (page) => page.id === selectedAccount,
      );

      if (!selectedPage) {
        return;
      }

      createPage(
        {
          goal,
          vibe: vibes[vibe]!,
          type,
          subType,
          description,
          selectedAccount: selectedPage,
        },
        {
          onSuccess: () => {
            void utils.instagram.getSavedPages.invalidate();
            toast("Successfully created page");
          },
        },
      );
    } else {
      setStep(step);
    }
  };

  const setSelectedAccount = (selectedAccount: string) => {
    setAccountonboardingData((d) => ({ ...d, selectedAccount }));
  };

  const setVibe = (vibe: number) => {
    setAccountonboardingData((d) => ({ ...d, vibe }));
  };

  const setDescription = (description: string) => {
    setAccountonboardingData((d) => ({ ...d, description }));
  };

  const setType = (type: InstagramPageType) => {
    setAccountonboardingData((d) => ({ ...d, type }));
  };

  const setSubType = (subType: string) => {
    setAccountonboardingData((d) => ({ ...d, subType }));
  };

  const setGoal = (goal: string) => {
    setAccountonboardingData((d) => ({ ...d, goal }));
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="rounded-xl bg-white p-8 shadow">
            <AccountOnboardingPageSelectForm
              selectedAccount={accountonboardingData.selectedAccount}
              onSelectAccount={setSelectedAccount}
              instagramAccounts={instagramPages ?? []}
            />
          </div>
        );

      case 1:
        return (
          <div className="rounded-xl bg-white p-8 shadow">
            <AccountOnboardingVibeSelect
              vibe={accountonboardingData.vibe}
              onChangeVibe={setVibe}
            />
          </div>
        );

      case 2:
        return (
          <div className="rounded-xl bg-white p-8 shadow">
            <AccountOnboardingBusinessAndSubtypeSelect
              pageType={accountonboardingData.type}
              subType={accountonboardingData.subType}
              onSelectType={setType}
              onSelectSubType={setSubType}
            />
          </div>
        );

      case 3:
        return (
          <div className="rounded-xl bg-white p-8 shadow">
            <AccountOnboardingGoalSelect
              goal={accountonboardingData.goal}
              onSelectGoal={setGoal}
            />
          </div>
        );

      case 4:
        return (
          <div className="rounded-xl bg-white p-8 shadow">
            <AccountOnboardingDescriptionSelect
              description={accountonboardingData.description}
              onChangeDescription={setDescription}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-50">
      <AccountOnboardingProgress progress={progress} />
      <AccountOnboardingHeader step={step} totalSteps={TOTAL_STEPS} />

      {/* Step Content */}
      <div className="mt-10 w-full max-w-xl">{renderStepContent()}</div>

      {/* Navigation */}
      <AccountOnboardingNavigation
        totalSteps={TOTAL_STEPS}
        setStep={onChangeStep}
        disabledNext={isPending || !setSelectedAccount}
        step={step}
      />
    </div>
  );
};
