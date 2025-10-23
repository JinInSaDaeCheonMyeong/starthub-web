import { StartHubColors } from "@/shared/design";
import styled from "styled-components";

export const UserMessageContainer = styled.div`
  gap: 10px;
  display: flex;
  justify-content: end;
`;

export const StartHubMessageContainer = styled.div`
  gap: 10px;
  display: flex;
  margin-bottom: 20px;
`;

export const UserMessageBubbleWrapper = styled.div`
  max-width: 410px;
  background-color: ${StartHubColors.White2};
  padding: 16px 20px;
  border-radius: 10px;
  user-select: text;
  cursor: text;
`;

export const StartHubMessageBubbleWrapper = styled.div`
  max-width: 410px;
  background-color: #e9f0fe;
  padding: 16px 20px;
  border-radius: 10px;
  position: relative;
  user-select: text;
  cursor: text;
`;

export const TypingCursor = styled.span`
  display: inline-block;
  margin-left: 2px;
  animation: blink 0.7s infinite;

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;
