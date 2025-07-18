import styled from "styled-components";
import { StartHubFont, StartHubColors } from "@/shared/design";

export const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 40px 0 50px;
`;

export const MenuButton = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${StartHubColors.Gray4};
    border-radius: 10px;
    p {
      color: ${StartHubColors.Black1};
    }
  }

  svg {
    width: 60px;
    height: 60px;
  }

  p {
    margin-top: 8px;
    ${StartHubFont.Pretendard.Body2.Medium}
    color: ${StartHubColors.Gray2};
  }
`;
