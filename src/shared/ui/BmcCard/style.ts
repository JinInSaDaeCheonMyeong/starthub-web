import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const BmcImageContainer = styled.div`
  display: inline-block;
  border-radius: 10px;
  background-color: ${StartHubColors.White1};
  cursor: pointer;
  width: 242px;
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
  opacity: 0.5;
  cursor: pointer;
  }
`;

export const ImageWrapper = styled.div`
  height: 100%;
  background-color: ${StartHubColors.White1};
  width: 100%;
`;

export const TextContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: ${StartHubColors.White1};
`;

export const Title = styled.p`
  color: ${StartHubColors.Black1};
  ${StartHubFont.Pretendard.Caption1.Regular};
`;

export const Date = styled.p`
  color: ${StartHubColors.Gray1};
  ${StartHubFont.Pretendard.Caption2.Regular};
`;