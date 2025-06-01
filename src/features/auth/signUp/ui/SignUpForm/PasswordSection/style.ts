import styled from "styled-components";
import { StartHubColors,StartHubFont } from "@/shared/design";

export const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  margin-bottom: 10px;
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;


export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  z-index: 1;
  
  @media (max-width: 480px) {
    right: 12px;
  }
`;

export const InputLabel = styled.label`
  font: ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Black1};
  margin-top: 10px;
`;