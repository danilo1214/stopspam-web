import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
}

export const Steps: React.FC<StepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      <div className="space-y-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-y-2  lg:gap-x-4">
            <div className="m-5 w-full flex-1 rounded-lg bg-white p-4 shadow-md">
              <div className=" flex flex-shrink-0 items-center gap-x-2">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    index < currentStep
                      ? "border-primary-500 bg-primary-500"
                      : "border-gray-300 bg-white"
                  } font-semibold text-white`}
                >
                  <CheckIcon className="size-6 font-bold text-white" />
                </div>
                <div
                  className={`text-center text-xl font-semibold ${
                    index <= currentStep
                      ? "text-textPrimary-900"
                      : "text-textPrimary-700"
                  }`}
                >
                  {step.title}
                </div>
              </div>
              {currentStep >= index && step.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
