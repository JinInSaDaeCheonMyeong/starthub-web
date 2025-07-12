import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

type CategoryColorProps = {
  txColor?: string;
};

export const NoticeContainer = styled.div`
  width: 250px;
  height: 150px;
  background-color: ${StartHubColors.White1};
  border: 2px solid ${StartHubColors.Gray4};
  padding: 30px 19px;
  border-radius: 14px;
  p {
    ${StartHubFont.Pretendard.Caption2.Regular}
    font-size: 10px;
    margin: 5px 0 5px 0;
  }
  margin-right: 12px;
`;

export const TitleText = styled.div`
  ${StartHubFont.Pretendard.Caption1.SemiBold}
  font-size: 14px;
  color: ${StartHubColors.Gray1};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

export const Tag = styled.div`
  width: fit-content;
  height: 16px;
  background-color: ${StartHubColors.Gray4};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  ${StartHubFont.Pretendard.Caption2.Medium}
  padding: 4px;
  border-radius: 4px;
`;

export const CategoryContainer = styled.div<CategoryColorProps>`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  span {
    ${StartHubFont.Pretendard.Caption1.Regular}
    font-size: 10px;
    color: ${({ txColor }) => txColor};
  }
`;
