import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const Container = styled.div<{ $type: "small" | "big" }>`
  max-width: fit-content;
  background-color: ${StartHubColors.White2};
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  span {
    ${StartHubFont.Pretendard.Body2.Regular}
    color: ${StartHubColors.Black1};
    word-break: break-word;
  }
  ${({ $type }) =>
    $type === "small" &&
    `
    span{
    word-break: break-word;
    font-size: 10px;
    }
    padding: 8px;
    border-radius: 10px;
    ${StartHubFont.Pretendard.Body1.Regular}
  `}
`;