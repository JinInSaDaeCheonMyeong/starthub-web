import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 200px;
  padding-right: 200px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  margin-bottom: 200px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  max-width: 1400px;
`;

export const MainContent = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
`;

export const Section = styled.section`
  max-width: 700px;
  padding-bottom: 20px;
  text-align: left;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 50px;
  margin-bottom: 20px;
  width: 100%;
`;

export const Title = styled.p`
  font: ${StartHubFont.Pretendard.Headlines2.SemiBold};
  color: ${StartHubColors.Black1};
  margin: 0;
`;

export const BmcImageWrapper = styled.div`
  width: 700px;
  margin-bottom: 40px;
  align-self: flex-start;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid ${StartHubColors.Gray3};
  }
`;

export const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${StartHubColors.Black1};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const Divider = styled.div`
  width: 700px;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: ${StartHubColors.Gray2};
  align-self: flex-start;
`;

export const CompetitorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  width: 700px;
`;
