import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const BmcImageContainer = styled.div`
  display: inline-block;
  border-radius: 10px;
  background-color: ${StartHubColors.White1};
  width: 242px;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
`;

export const ImageWrapper = styled.div`
  height: 100%;
  background-color: ${StartHubColors.White1};
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  img {
    width: 100%;
    height: 170px;
    border-radius: 10px;
    border: 1px solid ${StartHubColors.Gray3};
  }
`;

export const IconPlaceholder = styled.div`
  border-radius: 10px;
  width: 242px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${StartHubColors.Gray3};
`;

export const TextContainer = styled.div`
  display: flex;
  padding-top: 4px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${StartHubColors.White1};
  position: relative;
`;

export const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

export const Title = styled.p`
  color: ${StartHubColors.Black1};
  ${StartHubFont.Pretendard.Caption1.Regular};
`;

export const Date = styled.p`
  color: ${StartHubColors.Gray1};
  ${StartHubFont.Pretendard.Caption2.Regular};
`;

export const MenuButton = styled.button<{ $isDisabled?: boolean }>`
  background: transparent;
  border: none;
  padding: 4px;
  cursor: ${props => props.$isDisabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isDisabled ? 0.5 : 1};
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -2px;

  &:hover {
    opacity: ${props => props.$isDisabled ? 0.5 : 0.7};
  }

  svg {
    fill: ${StartHubColors.Gray2};
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: ${StartHubColors.White1};
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
  min-width: 120px;
`;

export const DropdownItem = styled.button<{ $isDelete?: boolean }>`
  width: 100%;
  padding: 10px 16px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  ${StartHubFont.Pretendard.Caption1.Regular}
  color: ${props => props.$isDelete ? StartHubColors.Error : StartHubColors.Black1};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${StartHubColors.Gray4};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${StartHubColors.Gray4};
  }
`;
