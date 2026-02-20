import styled from "styled-components";
import { StartHubFont } from "@/shared/design";

export const Container = styled.div`
  display: flex;
  background-color: #d7e4ff;
  padding: 14px;
  width: 158px;
  height: 60px;
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  svg {
    width: 31px;
    height: auto;
    flex: 0 0 auto;
    display: block;
  }

  div {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-width: 0;
    h1 {
      ${StartHubFont.Pretendard.Caption1.SemiBold}
      color: #12398F;
      margin: 0;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }

    p {
      ${StartHubFont.Pretendard.Caption1.Regular}
      margin: 0;
      color: inherit;
    }
  }
`;
