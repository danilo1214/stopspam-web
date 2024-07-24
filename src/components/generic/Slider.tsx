import React from "react";

export const Slider = ({
  labels,
  value,
  onChange,
  label,
}: {
  labels: string[];
  value: number;
  label: string;
  onChange: (v: number) => void;
}) => {
  const handleVibeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(event.target.value));
  };
  console.log(value);

  return (
    <div className="rounded-lg bg-white p-6">
      <label htmlFor="vibe-slider" className="mb-4 block  text-textPrimary-900">
        {label}
      </label>
      <div className="flex content-between justify-between text-xs">
        <div>{labels[0]}</div>

        <div>{labels[labels.length - 1]}</div>
      </div>
      <input
        id="vibe-slider"
        type="range"
        min={0}
        max={labels.length - 1}
        step={1}
        value={value}
        onChange={handleVibeChange}
        className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
      />
      <div className="mt-6 text-xl font-medium text-textPrimary-900">
        {labels[value]}
      </div>
    </div>
  );
};
