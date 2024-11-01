import React from "react";

export const Slider = ({
  labels,
  value,
  onChange,
  label,
}: {
  labels: string[];
  value: number;
  label?: string;
  onChange: (v: number) => void;
}) => {
  const handleVibeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(event.target.value));
  };

  return (
    <div className="relative rounded-full rounded-md px-7 py-6  shadow md:px-10 md:py-8">
      <input
        id="vibe-slider"
        type="range"
        min={0}
        max={labels.length - 1}
        step={1}
        value={value}
        onChange={handleVibeChange}
        className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-primary-300"
        style={{ position: "relative", zIndex: 2 }}
      />
      <div className="pointer-events-none absolute left-0 right-0 top-1/2  flex items-center justify-between px-7  text-center md:px-10 ">
        <div
          className="bold size-2 rounded-full bg-primary-300"
          aria-hidden="true"
        >
          <div
            className="size-2 -translate-x-3 translate-y-4 whitespace-nowrap text-xs"
            aria-hidden="true"
          >
            {labels[0]}
          </div>
        </div>

        {new Array(labels.length - 2).fill(0).map((_, idx) => (
          <div
            key={idx}
            className="bold size-2 rounded-full bg-primary-300"
            aria-hidden="true"
          >
            <div
              className="size-2 -translate-x-3 translate-y-4 whitespace-nowrap text-xs"
              aria-hidden="true"
            >
              {labels[idx + 1]}
            </div>
          </div>
        ))}
        <div
          className="bold size-2 rounded-full bg-primary-300"
          aria-hidden="true"
        >
          <div
            className=" size-2 -translate-x-3 translate-y-4 text-xs"
            aria-hidden="true"
          >
            {labels[labels.length - 1]}
          </div>
        </div>
      </div>
    </div>
  );
};
