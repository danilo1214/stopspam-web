import React, { useRef, useState, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value?: string;
  disabled?: boolean;
  onOptionChange: (value: string) => void;
  canSelectSearch?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  disabled = false,
  value,
  onOptionChange,
  canSelectSearch = false,
}) => {
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const selectRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update selected label on value change
  useEffect(() => {
    const matched = options.find((o) => o.value === value);
    if (matched) {
      setSelectedLabel(matched.label);
    } else if (value) {
      setSelectedLabel(value); // for custom values
    } else {
      setSelectedLabel("");
    }
  }, [value, options]);

  const handleSelect = (selectedValue: string) => {
    onOptionChange(selectedValue);
    setFilter("");
    setIsOpen(false);
  };

  const shouldShowSearchValue =
    canSelectSearch && filter && filteredOptions.length === 0;

  return (
    <div className="relative " ref={selectRef}>
      <input
        disabled={disabled}
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onClick={() => setIsOpen(!isOpen)}
        placeholder={selectedLabel || "Select..."}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm placeholder:text-textPrimary-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer px-3 py-2 hover:bg-primary-500 hover:text-white ${
                  value === option.value ? "bg-primary-100" : ""
                }`}
              >
                {option.label}
              </li>
            ))
          ) : shouldShowSearchValue ? (
            <li
              onClick={() => handleSelect(filter)}
              className="cursor-pointer px-3 py-2 hover:bg-primary-500 hover:text-white"
            >
              Select {filter}
            </li>
          ) : (
            <li className="px-3 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
