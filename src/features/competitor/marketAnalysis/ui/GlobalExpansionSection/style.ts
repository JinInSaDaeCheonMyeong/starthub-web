import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const Section = styled.section`
  max-width: 700px;
  padding-bottom: 20px;
  text-align: left;
`;

export const SectionTitle = styled.p`
  font: ${StartHubFont.Pretendard.Headlines1.SemiBold};
  color: ${StartHubColors.Black1};
  margin-bottom: 20px;
`;

export const MarketSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
`;

export const MarketItem = styled.div`
  position: relative;
`;

export const MarketTitle = styled.h3`
  font: ${StartHubFont.Pretendard.Body1.SemiBold};
  color: ${StartHubColors.Primary};
  margin-bottom: 10px;
`;

export const MarketCard = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: ${StartHubColors.White1};
  border: 1px solid ${StartHubColors.Gray3};
  margin-bottom: 10px;
`;

export const MarketCardTitle = styled.h4`
  font: ${StartHubFont.Pretendard.Caption1.Medium};
  color: ${StartHubColors.Black1};
  margin-bottom: 10px;
`;

export const MarketCardText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${StartHubColors.Black1};
  line-height: 1.5;
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
`;

export const GridItem = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #dbdbdb;
`;

export const ChallengeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

export const ChallengeItem = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #dbdbdb;
`;

export const ChallengeText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${StartHubColors.Black1};
  line-height: 1.5;
`;
