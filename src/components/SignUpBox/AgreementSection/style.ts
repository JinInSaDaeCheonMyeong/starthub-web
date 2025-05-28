import styled from "styled-components";
import { StartHubFont,StartHubColors } from "@/design";

export const CheckboxLabel = styled.label`
  font-size: 14px;
  font: ${StartHubFont.Pretendard.Caption1.Regular};
  color: ${StartHubColors.Gray2};
  flex: 1;
  margin-right: 8px;

`;

export const Divider = styled.div`
  width: 100%;
  max-width: 320px;
  height: 1px;
  background-color: ${StartHubColors.Gray3};
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;
  margin: 5px 0;
  width: 100%;
  max-width: 320px;
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;
export const CheckboxLabelMain = styled.label`
  font-size: 14px;
  font: ${StartHubFont.Pretendard.Body2.Regular};
  color: ${StartHubColors.Black1};
  flex-grow: 1;
`