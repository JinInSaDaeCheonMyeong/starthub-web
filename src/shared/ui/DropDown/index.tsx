import { useState, useRef, useEffect } from "react";
import { ReactComponent as ChevronDown } from "@assets/icons/chevron-down.svg";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface StartHubDropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  width?: number;
  isDisabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
}

export const StartHubDropdown = ({
  options,
  value,
  placeholder = "선택해주세요",
  width,
  isDisabled,
  className,
  onChange,
}: StartHubDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const isPlaceholder = !selectedOption || value === "";

  const handleToggle = () => {
    if (!isDisabled) setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block"
      style={{ width: width ? `${width}px` : "fit-content" }}
    >
      {/* 버튼 */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-between px-3 h-10 rounded-lg bg-white outline-none whitespace-nowrap min-w-[120px] w-fit font-pt-caption1-regular transition-colors",
          isOpen ? "border border-hub-primary" : "border border-hub-gray-3",
          "hover:border-hub-primary",
          "disabled:bg-hub-white-2 disabled:text-hub-gray-3 disabled:cursor-not-allowed",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span
          className={`pr-2 ${isPlaceholder ? "text-hub-gray-3" : "text-hub-black-1"}`}
        >
          {displayText}
        </span>
        <ChevronDown
          className={`w-4 h-4 fill-hub-gray-3 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* 리스트 */}
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-hub-gray-3 border-t-0 rounded-b-lg max-h-[200px] overflow-y-auto z-[1000] m-0 p-0 list-none shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="px-5 py-3 font-pt-caption1-regular text-hub-black-1 cursor-pointer hover:bg-hub-gray-3 last:rounded-b-lg"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
