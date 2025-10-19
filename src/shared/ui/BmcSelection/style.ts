import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const BmcTemplateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 1024px;

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
  justify-content: space-between;
  width: 1025px;
  margin-top: 40px;
  margin-right: 40px;
  margin-bottom: 80px;
`

export const Text = styled.p`
  font: ${StartHubFont.Pretendard.Body1.Medium};
  margin-bottom: 20px;
`;