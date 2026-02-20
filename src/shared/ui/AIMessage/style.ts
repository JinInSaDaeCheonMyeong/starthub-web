import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const Container = styled.div`
  width: fit-content;
  height: 45px;
  background-color: ${StartHubColors.White2};
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  span{
    ${StartHubFont.Pretendard.Body2.Regular}
    color: ${StartHubColors.Black1};
  }
`;