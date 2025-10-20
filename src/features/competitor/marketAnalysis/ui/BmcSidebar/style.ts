import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const BmcSidebar = styled.div`
  position: sticky;
  top: 50px;
  width: 300px;
  flex-shrink: 0;
  padding: 20px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 10px;
  background: ${StartHubColors.White1};
  max-height: calc(100vh - 90px);
  overflow-y: auto;
  align-self: flex-start;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${StartHubColors.Gray4};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${StartHubColors.Gray2};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${StartHubColors.Gray1};
  }
`;

export const BmcItem = styled.div`
  margin-bottom: 12px;
`;

export const BmcItemHeader = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: ${StartHubColors.Gray4};
  }

  ${props => props.$isOpen && `
    div, span {
      color: ${StartHubColors.Primary};
    }
  `}
`;

export const ToggleIcon = styled.span<{ $isOpen?: boolean }>`
  font-size: 12px;
  color: ${StartHubColors.Gray2};
  transition: transform 0.2s;
  transform: ${props => props.$isOpen ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

export const BmcItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font: ${StartHubFont.Pretendard.Caption1.SemiBold};
  color: ${StartHubColors.Black1};

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const BmcItemSubtitle = styled.span`
  font: ${StartHubFont.Pretendard.Caption2.Regular};
  color: ${StartHubColors.Gray2};
`;

export const BmcItemContent = styled.div`
  padding: 12px 16px 12px 32px;
  font: ${StartHubFont.Pretendard.Caption1.Regular};
  color: ${StartHubColors.Black1};
  line-height: 1.5;
`;
