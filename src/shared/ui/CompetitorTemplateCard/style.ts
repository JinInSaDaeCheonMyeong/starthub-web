import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const Container = styled.div`
  justify-content: space-between;
  width: 1025px;
  margin-top: 40px;
  margin-right: 40px;
  margin-bottom: 80px;
  min-height: 50vh;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 24px;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const Title = styled.p`
  font: ${StartHubFont.Pretendard.Body1.Medium};
`;

export const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 100%;
`;

export const BmcImageContainer = styled.div`
  display: inline-block;
  background-color: ${StartHubColors.White1};
  cursor: pointer;
  width: 242px;
  height: 168px;
  transition: all 0.3s ease;
  margin-bottom: 50px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export const ImageWrapper = styled.div`
  height: 100%;
  background-color: ${StartHubColors.White1};
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${StartHubColors.Gray3};

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const PlusIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 242px;
  height: 168px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 10px;

  svg {
    width: 70px;
    height: 70px;
    fill: ${StartHubColors.Primary};
  }
`;
