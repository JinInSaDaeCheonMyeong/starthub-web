import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 0 160px 0 200px;
  height: 100%;
`;

export const MainContent = styled.section`
  flex: 1;
  padding: 0 40px 0 40px;
`;

export const HeaderSection = styled.div`
  margin-bottom: 30px;
  margin-top: 50px;
`;

export const Motto = styled.p`
  font: ${StartHubFont.Pretendard.Headlines2.SemiBold};
  color: ${StartHubColors.Black1};
  margin-bottom: 8px;
`;

export const Greeting = styled.h2`
  font: ${StartHubFont.Pretendard.Title2};
  color: ${StartHubColors.Black1};
`;

export const Username = styled.span`
  color: ${StartHubColors.Primary};
`;

export const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

export const InfoRow = styled.tr`
  border-bottom: 1px solid ${StartHubColors.Gray3};
`;

export const InfoLabel = styled.th`
  text-align: left;
  padding: 20px;
  width: 150px;
  font: ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Black1};
`;

export const InfoValue = styled.td`
  padding: 12px;
  color: ${StartHubColors.Gray1};
  font: ${StartHubFont.Pretendard.Body2.Regular};
  text-align: right;
`;
