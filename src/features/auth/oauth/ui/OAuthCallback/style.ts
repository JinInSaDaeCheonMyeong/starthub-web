import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Message = styled.p`
  color: ${StartHubColors.Gray2};
  font-size: ${StartHubFont.Pretendard.Body1.Medium};
  font-weight: ${StartHubFont.Pretendard.Body1.Medium};
  font-family: ${StartHubFont.Pretendard.Body1.Medium};
  margin: 0;
`;