import React, { useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value?: string;
  onOptionChange: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onOptionChange,
}) => {
  // Local state for the search query and to handle dropdown visibility
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false); // Close dropdown if click happens outside
    }
  };

  // Add event listener to detect outside clicks
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const placeholder = options.find((o) => o.value === value)?.label ?? "";

  // Handle selection of an option
  const handleSelect = (selectedValue: string) => {
    onOptionChange(selectedValue);
    setFilter("");
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="relative w-64" ref={selectRef}>
      {/* Input field that also serves as the dropdown trigger */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown on click
        placeholder={placeholder}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
      />

      {/* Dropdown options */}
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
          ) : (
            <li className="px-3 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
