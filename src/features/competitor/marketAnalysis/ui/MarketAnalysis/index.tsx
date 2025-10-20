import React from "react";
import * as S from "./style";
import { MarketAnalysisResponse } from "../../types";
import UserScaleSection from "../UserScaleSection";
import InsightSection from "../InsightSection";
import GlobalExpansionSection from "../GlobalExpansionSection";
import BmcSidebar from "../BmcSidebar";
import CompetitorCard from "../CompetitorCard";
import { bmcApi } from "@/entities/bmc/api/bmc";
import { ReactComponent as Sparkles } from "@assets/icons/sparkles.svg";

interface MarketAnalysisProps {
  data: MarketAnalysisResponse;
  bmcId?: number;
}

const MarketAnalysis = ({ data, bmcId }: MarketAnalysisProps) => {
  const { userBmc, userScale, strengths, weaknesses, globalExpansionStrategy } =
    data.data;
  const [bmcImageUrl, setBmcImageUrl] = React.useState<
    string | null | undefined
  >(null);

  const domesticCompetitors =
    userScale.domesticCompetitors ||
    userScale.competitorComparison?.slice(0, 2) ||
    [];
  const foreignCompetitors =
    userScale.foreignCompetitors ||
    userScale.competitorComparison?.slice(2, 4) ||
    [];

  React.useEffect(() => {
    const fetchBmcImage = async () => {
      if (!bmcId) return;
      try {
        const response = await bmcApi.getCanvasesDetail(String(bmcId));
        setBmcImageUrl(response.data.imageUrl ?? null);
      } catch {
        setBmcImageUrl(null);
      }
    };
    fetchBmcImage();
  }, [bmcId]);

  return (
    <S.Container>
      <S.TitleWrapper>
        <Sparkles
          style={{ width: "24px", height: "24px", marginRight: "8px" }}
        />
        <S.Title>AI 분석 결과</S.Title>
      </S.TitleWrapper>

      <S.ContentWrapper>
        <S.MainContent>
          {bmcImageUrl && (
            <S.BmcImageWrapper>
              <img src={bmcImageUrl} alt="BMC" />
            </S.BmcImageWrapper>
          )}
          <UserScaleSection userScale={userScale} />

          <S.Section>
            <S.SubTitle>경쟁사와의 규모 비교</S.SubTitle>

            {domesticCompetitors.length > 0 && (
              <>
                <S.SubTitle>1. 국내 경쟁사</S.SubTitle>
                <S.CompetitorGrid>
                  {domesticCompetitors.map((competitor, index) => (
                    <CompetitorCard key={index} competitor={competitor} />
                  ))}
                </S.CompetitorGrid>
              </>
            )}

            {foreignCompetitors.length > 0 && (
              <>
                <S.SubTitle>2. 해외 경쟁사</S.SubTitle>
                <S.CompetitorGrid>
                  {foreignCompetitors.map((competitor, index) => (
                    <CompetitorCard key={index} competitor={competitor} />
                  ))}
                </S.CompetitorGrid>
              </>
            )}
          </S.Section>

          <S.Divider />
          <InsightSection strengths={strengths} weaknesses={weaknesses} />
          <S.Divider />
          <GlobalExpansionSection globalExpansion={globalExpansionStrategy} />
        </S.MainContent>

        <BmcSidebar userBmc={{ ...userBmc, id: bmcId }} />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default MarketAnalysis;
