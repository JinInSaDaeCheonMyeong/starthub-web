import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const BmcTemplateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1024px;

  svg {
    width: 242px;
    height: 170px;
    border-radius: 10px;
    border: 1px solid ${StartHubColors.Gray3};
    object-fit: cover;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

export const Text = styled.p`
  ${StartHubFont.Pretendard.Headlines2.SemiBold};
  margin-bottom: 20px;
  gap: 6px;
`;

export const Container = styled.div`
  justify-content: space-between;
  width: 1024px;
  margin-top: 40px;
`;

export const ImageWrapper = styled.div`
  height: 100%;
  background-color: ${StartHubColors.White1};
  width: 242px;

  svg {
    width: 242px;
    height: 170px;
    border-radius: 10px;
    border: 1px solid ${StartHubColors.Gray3};
    object-fit: cover;
    margin-bottom: 2px;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export const Title = styled.p`
  color: ${StartHubColors.Black1};
  ${StartHubFont.Pretendard.Caption1.Regular};
`;