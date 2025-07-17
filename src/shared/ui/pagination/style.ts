import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const pagination = styled.div`
  display: flex;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 30px;
  gap: 20px;
  p {
    ${StartHubFont.Pretendard.Caption1.Regular}
    color: ${StartHubColors.Gray2};
  }

  svg {
    width: 24px;
    height: 24px;
    &:hover {
      fill: black;
    }
  }
`;
export const PageNumber = styled.p<{ $isActive: boolean }>`
  cursor: pointer;
  padding-bottom: 4px;
  ${StartHubFont.Pretendard.Caption1.Regular}
  color: ${({ $isActive }) =>
    $isActive ? StartHubColors.Black1 : StartHubColors.Gray2};
  transition: all 0.2s ease;

  &:hover {
    color: ${StartHubColors.Black1};
  }
`;
