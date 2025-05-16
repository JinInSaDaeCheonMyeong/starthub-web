import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import styled, { CSSObject } from "styled-components";
import { StartHubFont } from "../../../Design/text/StartHubFont";
import { StartHubColors } from "../../../Design/color/StartHubColors";

type InputType = "text" | "password";

export interface StartHubTextFieldProps {
  type: InputType;
  label?: string;
  detailLabel?: string;
  isError?: boolean;
  width?: number;
  name?: string;
  value: string;
  placeholder: string;
  isDisabled?: boolean;
  supportingText?: string;
  customStyle?: CSSObject;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const Wrapper = styled.div<{ width?: number; customStyle?: CSSObject }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  ${({ customStyle }) => customStyle || ""}
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 12px;
  color: ${StartHubColors.Black1};
  ${StartHubFont.Pretendard.Body1.Medium}
  div {
    ${StartHubFont.Pretendard.Caption1.Medium}
    color: ${StartHubColors.Primary};
    font-size: 14px;
  }
`;

const Input = styled.input<{ isError?: boolean }>`
  padding: 20px 20px;
  ${StartHubFont.Pretendard.Body2.Medium}
  border: 1px solid ${({ isError }) =>
    isError ? "#f44336" : StartHubColors.Gray3};
  border-radius: 8px;
  outline: none;
  height: 60px;
  &::placeholder {
    color: ${StartHubColors.Gray3};
  }

  &:focus {
    border-color: ${({ isError }) =>
      isError ? "#f44336" : StartHubColors.Gray3};
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
  }
`;

const SupportingText = styled.span<{ isError?: boolean }>`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ isError }) => (isError ? "#f44336" : "#666")};
`;

export const StartHubTextField: React.FC<StartHubTextFieldProps> = ({
  type,
  label,
  detailLabel,
  isError,
  width,
  name,
  value,
  placeholder,
  isDisabled,
  supportingText,
  customStyle,
  onChange,
  onKeyDown,
}) => {
  return (
    <Wrapper width={width} customStyle={customStyle}>
      <Label htmlFor={name}>
        {label}
        <div>{detailLabel}</div>
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        isError={isError}
        disabled={isDisabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {supportingText && (
        <SupportingText isError={isError}>{supportingText}</SupportingText>
      )}
    </Wrapper>
  );
};
