import styled from "styled-components";
import { StartHubColors,StartHubFont } from "@/shared/design";

type BoxButtonProps = {
    bgColor ?: string;
    hvColor ?: string;
};

export const BoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 274px;
  gap: 19px;
  justify-content: center;
`;
export const PinkBox = styled.div`
  width: 334px;
  height: 100%;
  background-color: #fff1f7;
  color: #ff71af;
  padding: 80px 30px;
  border-radius: 20px;
`;

export const BoxButton = styled.div<BoxButtonProps>`
  background-color: ${({ bgColor }) => bgColor};
  width: 100px;
  height: 40px;
  color: #fff;
  ${StartHubFont.WantedSans.Body2}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 12px;
  cursor: pointer;
  &:hover{
    background-color: ${({ hvColor }) => hvColor};
  }
`;

export const BoxContent = styled.div`
  ${StartHubFont.WantedSans.Title2}
  div {
    ${StartHubFont.Pretendard.Caption1.Medium}
  }
  span {
    color: ${StartHubColors.Gray2};
    ${StartHubFont.Pretendard.Body2.Medium}
  }
`;

export const GreenBox = styled.div`
  width: 334px;
  height: 190px;
  background-color: #eafbf0;
  color: #64dd91;
  padding: 40px 30px;
  border-radius: 20px;
`;

export const BlueBox = styled.div`
  width: 334px;
  height: 70px;
  background-color: #e8f7ff;
  color: ${StartHubColors.Primary};
  border-radius: 20px;
  margin-top: 14px;
  ${StartHubFont.WantedSans.Body1}
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PurpleBox = styled.div`
  width: 334px;
  height: 190px;
  background-color: #f6e8ff;
  color: #d290fb;
  padding: 40px 30px;
  border-radius: 20px;
`;

export const GrayBox = styled.div<BoxButtonProps>`
  background-color: #e5e5e5;
  width: 160px;
  height: 70px;
  border-radius: 20px;
  ${StartHubFont.WantedSans.Body1}
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    background-color: ${({ hvColor }) => hvColor};
  }
  cursor: pointer;
`;
