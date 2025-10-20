
import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${StartHubColors.Black1};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: ${StartHubColors.White1};
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 10px;
  padding: 51px 75px;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
`;

export const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const Text = styled.p`
  ${StartHubFont.Pretendard.Caption1.Medium};
  color: ${StartHubColors.Black1};
`;

export const SubText = styled.p`
  ${StartHubFont.Pretendard.Caption2.Regular};
  color: ${StartHubColors.Gray1};
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 16px;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid ${StartHubColors.Gray3};
  background-color: ${StartHubColors.White1};
  color: ${StartHubColors.Gray1};
  border-radius: 8px;
  cursor: pointer;
  ${StartHubFont.Pretendard.Body2.Medium};
  
  &:hover {
    background-color: ${StartHubColors.Gray4};
  }
`;

export const CreateButton = styled.button<{ disabled: boolean }>`
  padding: 12px 24px;
  border: none;
  background-color: ${({ disabled }) => disabled ? StartHubColors.Gray3 : StartHubColors.Primary};
  color: ${StartHubColors.White1};
  border-radius: 8px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  ${StartHubFont.Pretendard.Body2.Medium};
  
  &:hover {
    background-color: ${({ disabled }) => disabled ? StartHubColors.Gray3 : StartHubColors.Primary};
  }
`;