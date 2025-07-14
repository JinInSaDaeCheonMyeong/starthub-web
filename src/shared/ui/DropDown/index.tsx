import { useState, useRef, useEffect } from "react";
import styled, { CSSObject } from "styled-components";
import { StartHubFont } from "@/shared/design/text/StartHubFont";
import { StartHubColors } from "@/shared/design/color/StartHubColors";
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
  customStyle?: CSSObject;
  onChange: (value: string) => void;
}

const Wrapper = styled.div<{ width?: number }>`
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
`;

const DropdownButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["customStyle", "$isOpen"].includes(prop),
})<{ customStyle?: CSSObject; $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  height: 40px;
  ${StartHubFont.Pretendard.Caption1.Regular}
  border: 1px solid ${({ $isOpen }) =>
    $isOpen ? StartHubColors.Primary : StartHubColors.Gray3};
  border-radius: 8px;
  background: white;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: ${StartHubColors.Primary};
  }

  &:disabled {
    background-color: ${StartHubColors.White2};
    color: ${StartHubColors.Gray3};
    cursor: not-allowed;
  }

  ${({ customStyle }) => customStyle || ""}
`;

const DropdownText = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "$isPlaceholder",
})<{ $isPlaceholder: boolean }>`
  color: ${({ $isPlaceholder }) =>
    $isPlaceholder ? StartHubColors.Gray3 : StartHubColors.Black1};
  flex: 1;
  text-align: left;
  padding-right: 10px;
`;

const ChevronIcon = styled(ChevronDown).withConfig({
  shouldForwardProp: (prop) => prop !== "$isOpen",
})<{ $isOpen: boolean }>`
  width: 16px;
  height: 16px;
  fill: ${StartHubColors.Gray3};
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownList = styled.ul.withConfig({
  shouldForwardProp: (prop) => prop !== "$isOpen",
})<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 8px;
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 12px 20px;
  ${StartHubFont.Pretendard.Caption1.Regular}
  color: ${StartHubColors.Black1};
  cursor: pointer;

  &:hover {
    background-color: ${StartHubColors.Gray3};
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const StartHubDropdown = ({
  options,
  value,
  placeholder = "선택해주세요",
  width,
  isDisabled,
  customStyle,
  onChange,
}: StartHubDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const isPlaceholder = !selectedOption;

  const handleToggle = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper width={width} ref={dropdownRef}>
      <DropdownButton
        type="button"
        onClick={handleToggle}
        disabled={isDisabled}
        customStyle={customStyle}
        $isOpen={isOpen}
      >
        <DropdownText $isPlaceholder={isPlaceholder}>{displayText}</DropdownText>
        <ChevronIcon $isOpen={isOpen} />
      </DropdownButton>

      <DropdownList $isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </Wrapper>
  );
};