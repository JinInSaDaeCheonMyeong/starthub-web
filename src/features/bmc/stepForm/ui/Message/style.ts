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
`;

export const UserMessageBubbleWrapper = styled.div`
  max-width: 410px;
  background-color: ${StartHubColors.White2};
  padding: 16px 20px;
  border-radius: 10px;
`;

export const StartHubMessageBubbleWrapper = styled.div`
  max-width: 410px;
  background-color: #E9F0FE;
  padding: 16px 20px;
  border-radius: 10px;
`;