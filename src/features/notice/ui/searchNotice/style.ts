import { StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const SearchNoticeContainer = styled.div`
  h1 {
    ${StartHubFont.Pretendard.Headlines1.SemiBold}
    margin-bottom: 30px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
export const DropdownContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: nowrap;
`