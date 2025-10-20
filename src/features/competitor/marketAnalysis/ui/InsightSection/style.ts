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

export const InsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
`;

export const InsightCard = styled.div<{ type: "opportunity" | "threat" }>`
  padding: 24px;
  border-radius: 10px;
  background: ${(props) =>
    props.type === "opportunity" ? "#eefdf4" : "#fff6ef"};
  border: 1px solid
    ${(props) => (props.type === "opportunity" ? "#d6fae2" : "#ffe8d2")};
`;

export const InsightTitle = styled.h3<{ type: "opportunity" | "threat" }>`
  font: ${StartHubFont.Pretendard.Body1.SemiBold};
  color: ${(props) => (props.type === "opportunity" ? "#14532d" : "#7c2d12")};
  margin-bottom: 10px;
`;

export const InsightItem = styled.div<{ type: "opportunity" | "threat" }>`
  padding: 20px 16px;
  border-radius: 10px;
  background: ${(props) =>
    props.type === "opportunity" ? "#fafefc" : "#fefcfb"};
  border: 1px solid
    ${(props) => (props.type === "opportunity" ? "#dbfbe7" : "#fefcfb")};
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InsightText = styled.p<{ type: "opportunity" | "threat" }>`
  font: ${StartHubFont.Pretendard.Caption1.Regular};
  color: ${(props) => (props.type === "opportunity" ? "#14532d" : "#7c2d12")};
`;
