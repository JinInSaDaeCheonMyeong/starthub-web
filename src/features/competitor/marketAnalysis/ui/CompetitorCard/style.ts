import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const CompetitorCard = styled.div`
  width: 340px;
  padding: 20px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 8px;
  box-sizing: border-box;
`;

export const CompetitorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

export const CompetitorLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: contain;
`;

export const CompetitorName = styled.p`
  font: ${StartHubFont.Pretendard.Body2.SemiBold};
  margin-bottom: 10px;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid ${StartHubColors.Gray3};
  margin-bottom: 16px;
`;

export const InfoLabel = styled.p`
  font: ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Gray2};
`;

export const InfoValue = styled.span`
  font: ${StartHubFont.Pretendard.Body2.SemiBold};
  color: ${StartHubColors.Black1};
`;

export const DetailSection = styled.div`
  margin-bottom: 10px;

  h5 {
    font-size: 14px;
    font-weight: 500;
    color: ${StartHubColors.Gray2};
    margin-bottom: 6px;
  }

  p {
    font-size: 12px;
    color: ${StartHubColors.Black1};
    line-height: 1.5;
  }
`;

export const DetailText = styled.p`
  font: ${StartHubFont.Pretendard.Caption1.Medium};
`;
