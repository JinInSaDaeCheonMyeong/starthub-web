import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

type CategoryColorProps = {
  $txColor?: string;
};

export const CardContainer = styled.div`
  width: 250px;
  height: 150px;
  background-color: ${StartHubColors.White1};
  border-radius: 14px;
  border: 2px solid ${StartHubColors.Gray4};
  padding: 25px 16px;

  p {
    ${StartHubFont.Pretendard.Body1.SemiBold}
  }
  span {
    color: #3e3e3e;
    ${StartHubFont.Pretendard.Caption2.Medium}
  }
  margin-right: auto;
`;

export const Tag = styled.div`
  width: fit-content;
  height: 20px;
  background-color: ${StartHubColors.Gray4};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  ${StartHubFont.Pretendard.Caption2.Medium}
  padding: 5px;
  border-radius: 4px;
`;

export const CategoryContainer = styled.div<CategoryColorProps>`
  display: flex;
  align-items: center;
  margin: 4px 0;
  span {
    ${StartHubFont.Pretendard.Caption1.Medium}
    font-size: 10px;
    color: ${({ $txColor }) => $txColor};
  }
`;
