import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { ButtonProps } from "@/entities/user/model/types";

export const Section = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h3`
  font: ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Black1};
  margin-bottom: 8px;
`;

export const SectionDescription = styled.p`
  font: ${StartHubFont.Pretendard.Caption2.Regular};
  color: ${StartHubColors.Primary};
  margin-bottom: 16px;
`;

export const SelectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

export const Select = styled.select`
  width: 100%;
  height: 50px;
  padding: 15px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 10px;
  font: ${StartHubFont.Pretendard.Caption1.Regular};
  background-color: ${StartHubColors.White1};
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const GenderButton = styled.button<ButtonProps>`
  padding: 15px;
  border: 1px solid ${({ $active }) => $active ? StartHubColors.Primary : StartHubColors.Gray3};
  border-radius: 10px;
  background-color: ${({ $active }) => $active ? `${StartHubColors.Primary}10` : StartHubColors.White1};
  color: ${({ $active }) => $active ? StartHubColors.Primary : StartHubColors.Gray3};
  font: ${StartHubFont.Pretendard.Caption1.Regular};
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  height: 50px;
  
  &:hover {
    border-color: ${({ $active }) => $active ? StartHubColors.Primary : StartHubColors.Gray2};
  }
`;