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

export const CardGrid = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  flex: 1;
`;

export const CardTitle = styled.h4`
  font: ${StartHubFont.Pretendard.Body2.SemiBold};
  color: ${StartHubColors.Black1};
  margin-bottom: 10px;
`;

export const CardContent = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${StartHubColors.Gray3};
`;

export const CardText = styled.p`
  font: ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Black1};
`;
