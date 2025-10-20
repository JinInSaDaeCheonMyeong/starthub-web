import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatContainer = styled.div`
  width: 680px;
  min-height: 650px;
  background-color: ${StartHubColors.White1};
  border: 2px solid ${StartHubColors.Gray3};
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 20px;
`;

export const MessagesContainer = styled.div`
  ${StartHubFont.Pretendard.Caption1.Regular}
  resize: none;
  border: none;
  outline: none;
  overflow-y: scroll;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

export const TextAreaContainer = styled.div`
  padding: 14px 20px;
  background-color: ${StartHubColors.White1};
  border: 2px solid ${StartHubColors.Gray3};
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  ${StartHubFont.Pretendard.Caption1.Regular}
  width: 100%;
  min-height: 1.5em;
  line-height: 1.5;
  resize: none;
  border: none;
  outline: none;
  overflow-y: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: block;

  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }

  &::placeholder {
    color: ${StartHubColors.Gray2};
  }
`;
