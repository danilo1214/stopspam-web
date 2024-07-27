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
          <div
            key={index}
            className="flex flex-col items-start gap-x-5 gap-y-2 lg:flex-row"
          >
            <div className="flex w-full flex-shrink-0 space-x-4 lg:w-72">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  index <= currentStep
                    ? "border-primary-500 bg-primary-500"
                    : "border-gray-300 bg-white"
                } font-semibold text-white`}
              >
                <CheckIcon className="size-6 font-bold text-white" />
              </div>
              <div
                className={`mt-2 text-center ${
                  index <= currentStep ? "text-primary-500" : "text-gray-500"
                }`}
              >
                {step.title}
              </div>
            </div>
            {currentStep >= index && (
              <div className="w-full flex-1 rounded-lg border bg-white p-4 shadow-lg">
                {step.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
