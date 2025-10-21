import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const BmcTemplateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  max-width: 1024px;

  img {
    width: 242px;
    height: 170px;
    border-radius: 10px;
    border: 1px solid ${StartHubColors.Gray3};

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

export const Container = styled.div`
  width: 1024px;
  justify-content: flex-start;
  margin-top: 40px;
  min-height: 50vh;
`;

export const Text = styled.p`
  ${StartHubFont.Pretendard.Headlines2.SemiBold};
  margin-bottom: 20px;
`;