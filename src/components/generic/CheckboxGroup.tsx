import React from "react";

interface CheckboxSelectProps {
  options: { label: string; value: any }[];
  selectedOptions: any[];
  setSelectedOptions: (selected: any[]) => void;
}

const CheckboxSelect: React.FC<CheckboxSelectProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.value} className="mb-2 flex items-center">
          <input
            type="checkbox"
            id={option.value}
            checked={selectedOptions.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            className="form-checkbox text-primary h-5 w-5 accent-primary-500"
          />
          <label htmlFor={option.label} className="ml-2 text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxSelect;
