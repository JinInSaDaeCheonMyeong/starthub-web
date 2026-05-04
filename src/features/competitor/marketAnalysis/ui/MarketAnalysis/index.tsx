import React from "react";
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
    // Container
    <div className="flex flex-col items-start px-[200px] w-full box-border text-left mb-[200px]">
      {/* TitleWrapper */}
      <div className="flex items-center justify-start mt-[50px] mb-5 w-full">
        <Sparkles className="w-6 h-6 mr-2" />
        {/* Title */}
        <p className="font-pt-h2-semibold text-hub-black-1 m-0">AI 분석 결과</p>
      </div>

      {/* ContentWrapper */}
      <div className="flex gap-10 w-full max-w-[1400px]">
        {/* MainContent */}
        <div className="flex-1 min-w-0 text-left select-text">
          {/* BmcImageWrapper */}
          {bmcImageUrl && (
            <div className="w-[700px] mb-10 self-start">
              <img
                src={bmcImageUrl}
                alt="BMC"
                className="w-full h-auto rounded-[10px] border border-hub-gray-3"
              />
            </div>
          )}

          <UserScaleSection userScale={userScale} />

          {/* Section */}
          <section className="max-w-[700px] pb-5 text-left select-text">
            <h3 className="text-base font-semibold text-hub-black-1 mb-2.5 mt-2.5">
              경쟁사와의 규모 비교
            </h3>

            {domesticCompetitors.length > 0 && (
              <>
                <h3 className="text-base font-semibold text-hub-black-1 mb-2.5 mt-2.5">
                  1. 국내 경쟁사
                </h3>
                {/* CompetitorGrid */}
                <div className="flex flex-wrap gap-5 justify-start w-[700px]">
                  {domesticCompetitors.map((competitor, index) => (
                    <CompetitorCard key={index} competitor={competitor} />
                  ))}
                </div>
              </>
            )}

            {foreignCompetitors.length > 0 && (
              <>
                <h3 className="text-base font-semibold text-hub-black-1 mb-2.5 mt-2.5">
                  2. 해외 경쟁사
                </h3>
                {/* CompetitorGrid */}
                <div className="flex flex-wrap gap-5 justify-start w-[700px]">
                  {foreignCompetitors.map((competitor, index) => (
                    <CompetitorCard key={index} competitor={competitor} />
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Divider */}
          <div className="w-[700px] h-px mt-5 mb-[30px] bg-hub-gray-2 self-start" />
          <InsightSection strengths={strengths} weaknesses={weaknesses} />
          {/* Divider */}
          <div className="w-[700px] h-px mt-5 mb-[30px] bg-hub-gray-2 self-start" />
          <GlobalExpansionSection globalExpansion={globalExpansionStrategy} />
        </div>

        <BmcSidebar userBmc={{ ...userBmc, id: bmcId }} />
      </div>
    </div>
  );
};

export default MarketAnalysis;
