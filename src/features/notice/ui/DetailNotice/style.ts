import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";

export const DetailContainer = styled.div`
  padding: 60px 160px;
  background-color: #ffffff;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
  svg {
    width: 22px;
    height: 22px;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;

  span {
    margin-left: 6px;
    color: ${StartHubColors.Primary};
    ${StartHubFont.Pretendard.Caption1.Medium}
    font-size: 20px;
  }
  svg {
    width: 22px;
    height: 22px;
  }
`;

export const TitleText = styled.h1`
  ${StartHubFont.Pretendard.Title3}
  margin-bottom: 30px;
  color: #222;
`;

export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  ${StartHubFont.Pretendard.Headlines1.SemiBold}
  margin-bottom: 12px;
`;

export const SectionBox = styled.div`
  background-color: #f8f8f8;
  padding: 20px 24px;
  border-radius: 12px;

  p,
  ul {
    ${StartHubFont.Pretendard.Caption1.Medium}
    color: #333;
    line-height: 1.7;
    font-size: 18px;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  li + li {
    margin-top: 8px;
  }

  a {
    color: ${StartHubColors.Primary};
    text-decoration: underline;
  }
`;

export const Detailborder = styled.div`
  height: 1px;
  background-color: ${StartHubColors.Gray3};
  margin-bottom: 30px;
`;
