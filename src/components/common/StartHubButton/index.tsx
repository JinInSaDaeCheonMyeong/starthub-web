import { CSSObject } from "styled-components";
import styled from "styled-components";
import { StartHubColors } from "../../../Design/color/StartHubColors";
import type { Interpolation } from 'styled-components';


type FlattenSimpleInterpolation = Interpolation<object>[];

export interface ButtonProps {
  text: string;
  textTheme?: string;
  width?: number;
  height?: number;
  typography?: FlattenSimpleInterpolation;
  backgroundColor: string;
  onClick: () => void;
  disabled?: boolean;
  customStyle?: CSSObject;
}

interface StyledButtonProps {
  width?: number;
  height?: number;
  backgroundColor: string;
  textTheme?: string;
  disabled?: boolean;
  customStyle?: CSSObject;
  typography?:  FlattenSimpleInterpolation ; 
}

const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '48px')};
  background-color: ${({ backgroundColor, disabled }) =>
    disabled ? StartHubColors.Gray3 : backgroundColor};
  color: ${({ textTheme, disabled }) =>
    disabled ? StartHubColors.Gray2 : textTheme ? textTheme : StartHubColors.White1};
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

  ${({ typography }) => typography} 
  ${({ customStyle }) => customStyle}
`;

export const StartHubButton = ({
  text,
  textTheme = 'White1',
  width,
  height,
  typography,
  backgroundColor,
  onClick,
  disabled = false,
  customStyle
}: ButtonProps) => {

  return (
    <StyledButton
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      textTheme={textTheme}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      typography={typography}
      customStyle={customStyle}
    >
      {text}
    </StyledButton>
  );
};
