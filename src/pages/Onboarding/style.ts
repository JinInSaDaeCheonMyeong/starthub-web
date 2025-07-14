import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";

export const OnboardingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${StartHubColors.White2};
  padding: 20px;
`;

export const OnboardingForm = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: ${StartHubColors.White1};
  border-radius: 30px;
  padding: 45px;
  
  @media (max-width: 768px) {
    padding: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const SectionContainer = styled.div`
  padding: 0 40px;
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

export const Label = styled.div`
  font: ${StartHubFont.Pretendard.Headlines2.SemiBold};
  text-align: center;
  color: ${StartHubColors.Black1};
  margin-top: 16px;
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  background-color: ${({ disabled }) => disabled ? StartHubColors.Gray2 : StartHubColors.Primary};
  color: ${StartHubColors.White1};
  padding: 16px;
  border: none;
  border-radius: 8px;
  font: ${StartHubFont.Pretendard.Body1.SemiBold};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ disabled }) => disabled ? StartHubColors.Gray2 : StartHubColors.Primary};
  }
`;