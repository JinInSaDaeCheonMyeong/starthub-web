import { StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const NoticeContentContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  padding: 0 200px;
  min-height: 50vh;
`;

export const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  justify-content: space-between;
  row-gap: 20px;
  width: 100%;
`;

export const ExceptionMessage = styled.p`
  ${StartHubFont.Pretendard.Body1.Medium}
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;
