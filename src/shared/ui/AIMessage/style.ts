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
  .attachments {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
  }
  .attachments img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid ${StartHubColors.Gray3};
  }
  .attachments .file-link {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 8px;
    background: ${StartHubColors.White1};
    border: 1px solid ${StartHubColors.Gray3};
    color: ${StartHubColors.Gray2};
    ${StartHubFont.Pretendard.Body2.Regular}
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
