import { StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const FoldArrowContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-top: 60px;
  padding: 0 190px;
  span {
    ${StartHubFont.Pretendard.Headlines2.SemiBold}
    margin-left: 10px;
  }
  svg {
    width: 15px;
  }
`;
