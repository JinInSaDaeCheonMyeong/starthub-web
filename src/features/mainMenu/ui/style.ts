import styled from "styled-components";
import { StartHubFont, StartHubColors } from "@/shared/design";

export const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  padding: 40px 0 50px;
`;

export const MenuButton = styled.div`
  width: 104px;
  height: 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    p {
      color: ${StartHubColors.Black1};
    }
  }

  p {
    margin-top: 8px;
    ${StartHubFont.Pretendard.Body2.Regular}
    color: ${StartHubColors.Gray2};
  }

  img {
    width: 78px;
    height: fit-content;
  }

  div {
    width: 104px;
    height: 104px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
