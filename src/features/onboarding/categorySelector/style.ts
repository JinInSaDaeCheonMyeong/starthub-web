import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { CategoryButtonProps } from "@/entities/user/model/types";

export const Section = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.p`
  font: ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Black1};
  margin-bottom: 10px;

  span{
    color: ${StartHubColors.Primary};
    font-size: 14px;
  }
`;

export const SectionDescription = styled.p`
  font: ${StartHubFont.Pretendard.Caption2.Regular};
  color: ${StartHubColors.Primary};
  margin-bottom: 16px;
`;

export const CategoryIconWrapper = styled.img`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`;

export const CategoryButton = styled.button<CategoryButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  width: fit-content;
  border: 1px solid ${({ $customColor }) => $customColor ?? StartHubColors.Primary};
  border-radius: 10px;
  background-color: ${({ $active, $customColor }) =>
    $active ? `${$customColor ?? StartHubColors.Primary}30` : StartHubColors.White1};
  color: ${({ $customColor }) => $customColor ?? StartHubColors.Primary};
  font: ${StartHubFont.Pretendard.Caption2.Regular};
  cursor: pointer;
  transition: all 0.2s;
`;

export const CategoryIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`

export const CategoryText = styled.span<{ $txColor: string }>`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.$txColor};
  text-align: center;
  line-height: 1.2;
`

export const CategoryContainer = styled.div<{ $txColor: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  span {
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => props.$txColor};
    text-align: center;
    line-height: 1.2;
  }
`;