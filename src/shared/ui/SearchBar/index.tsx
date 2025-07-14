import { ChangeEventHandler, KeyboardEventHandler } from "react";
import styled, { CSSObject } from "styled-components";
import { StartHubFont } from "@/shared/design/text/StartHubFont";
import { StartHubColors } from "@/shared/design/color/StartHubColors";
import { ReactComponent as Search } from "@assets/icons/search.svg";

export interface StartHubSearchBarProps {
  value: string;
  placeholder?: string;
  width?: number;
  isDisabled?: boolean;
  customStyle?: CSSObject;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const Wrapper = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  position: relative;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 8px;
  padding: 20px;
  height: 40px;
  
  &:focus-within {
    border-color: ${StartHubColors.Primary};
  }
`;

const SearchIcon = styled(Search)`
  width: 20px;
  height: 20px;
  margin-right: 12px;
`;

const SearchInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "customStyle",
})<{ customStyle?: CSSObject }>`
  ${StartHubFont.Pretendard.Caption1.Regular}
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  
  &::placeholder {
    color: ${StartHubColors.Gray3};
  }

  &:disabled {
    background-color: ${StartHubColors.White2};
    color: ${StartHubColors.Gray3};
  }

  ${({ customStyle }) => customStyle || ""}
`;

export const StartHubSearchBar = ({
  value,
  placeholder = "검색어를 입력하세요",
  width,
  isDisabled,
  customStyle,
  onChange,
  onKeyDown,
}: StartHubSearchBarProps) => {
  return (
    <Wrapper width={width}>
      <SearchIcon />
      <SearchInput
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        customStyle={customStyle}
      />
    </Wrapper>
  );
};