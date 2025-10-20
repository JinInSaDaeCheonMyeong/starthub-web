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
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 170px;
    border-radius: 10px;
  }
`;

export const IconPlaceholder = styled.div`
  border-radius: 10px;
  width: 242px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${StartHubColors.Gray3};
`;

export const TextContainer = styled.div`
  display: flex;
  padding-top: 4px;
  flex-direction: column;
  gap: 2px;
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
