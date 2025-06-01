import { ChangeEventHandler, KeyboardEventHandler } from "react";
import styled, { CSSObject } from "styled-components";
import { StartHubFont } from "@/shared/design/text/StartHubFont";
import { StartHubColors } from "@/shared/design/color/StartHubColors";

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

const Wrapper = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
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

const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => !["customStyle", "isError"].includes(prop),
})<{ isError?: boolean; customStyle?: CSSObject }>`
  padding: 20px 20px;
  ${StartHubFont.Pretendard.Caption1.Regular}
  border: 1px solid ${({ isError }) =>
    isError ? StartHubColors.Error : StartHubColors.Gray3};
  border-radius: 8px;
  outline: none;
  height: 50px;

  &::placeholder {
    color: ${StartHubColors.Gray3};
  }

  &:focus {
    border-color: ${({ isError }) =>
      isError ? StartHubColors.Error : StartHubColors.Primary};
  }

  &:disabled {
    background-color: ${StartHubColors.White2};
    color: ${StartHubColors.Gray3};
  }

  ${({ customStyle }) => customStyle || ""}
`;

const SupportingText = styled.span<{ isError?: boolean }>`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ isError }) =>
    isError ? StartHubColors.Error : StartHubColors.Gray3};
`;

export const StartHubTextField = ({
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
}: StartHubTextFieldProps) => {
  return (
    <Wrapper width={width}>
      {(label || detailLabel) && (
        <Label htmlFor={name}>
          {label}
          {detailLabel && <div>{detailLabel}</div>}
        </Label>
      )}
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
        customStyle={customStyle}
      />
      {supportingText && (
        <SupportingText isError={isError}>{supportingText}</SupportingText>
      )}
    </Wrapper>
  );
};
