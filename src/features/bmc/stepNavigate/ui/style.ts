import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";
import { StepStateProps } from "../model/types";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${StartHubColors.White2};
  overflow: auto;
  height: 650px;
`;

export const StepItem = styled.div`
  display: flex;
  gap: 25px;
  position: relative;
`;

export const StepIconWrapper = styled.div<StepStateProps>`
  width: 50px;
  height: 50px;
  background-color: ${({ $isCompleted, $isCurrent }) => {
    if ($isCurrent) return StartHubColors.Primary;
    if ($isCompleted) return '#EAEAEA';
    return StartHubColors.White1;
  }};
  color: ${({ $isCompleted, $isCurrent }) => {
    if ($isCurrent) return StartHubColors.White1;
    if ($isCompleted) return StartHubColors.Gray2;
    return StartHubColors.Black1;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  
  svg {
    width: 24px;
    height: 24px;
    
    * {
      fill: currentColor;
    }
  }
`;

export const StepIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StepLabel = styled.div<StepStateProps>`
  ${StartHubFont.WantedSans.Body3};
  color: ${({ $isCompleted, $isCurrent }) => {
    if ($isCurrent) return StartHubColors.Black1;
    if ($isCompleted) return StartHubColors.Gray2;
    return StartHubColors.Black1;
  }};
  background-color: ${({ $isCompleted, $isCurrent }) => {
    if ($isCurrent) return StartHubColors.White1;
    if ($isCompleted) return "#EAEAEA";
    return StartHubColors.White1;
  }};
  border: ${({ $isCompleted, $isCurrent }) => {
    if ($isCurrent) return StartHubColors.Primary;
    if ($isCompleted) return '#EAEAEA';
    return StartHubColors.White1;
  }};
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: 340px;
  height: 50px;
  padding-left: 20px;
`;

export const StepContent = styled.div`
  ${StartHubFont.Pretendard.Caption2.Regular};
  color: ${StartHubColors.Black1};
  background-color: ${StartHubColors.White1};
  border: 2px solid ${StartHubColors.Primary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 340px;
  height: 90px;
  padding: 16px 20px;

  span {
    color: ${StartHubColors.Primary};
  }
  
  div:first-child {
    ${StartHubFont.WantedSans.Body3};
  }
`;
