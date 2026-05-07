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

  // 데이터 구조 디버깅
  console.log("MarketAnalysis data:", {
    userBmc,
    userScale,
    strengths,
    weaknesses,
    globalExpansionStrategy,
    fullData: data.data
  });

  // userScale 데이터 상세 확인
  if (userScale) {
    console.log("UserScale 상세:", {
      estimatedUserBase: userScale.estimatedUserBase,
      estimatedUserBaseType: typeof userScale.estimatedUserBase,
      marketPosition: userScale.marketPosition,
      marketPositionType: typeof userScale.marketPosition,
      growthPotential: userScale.growthPotential,
      growthPotentialType: typeof userScale.growthPotential
    });
  }

  const [bmcImageUrl, setBmcImageUrl] = React.useState<
    string | null | undefined
  >(null);

  // competitorComparison 데이터를 국내/해외로 분류
  const allCompetitors = userScale?.competitorComparison || [];
  const domesticCompetitors =
    userScale?.domesticCompetitors ||
    allCompetitors.slice(0, Math.ceil(allCompetitors.length / 2)) ||
    [];
  const foreignCompetitors =
    userScale?.foreignCompetitors ||
    allCompetitors.slice(Math.ceil(allCompetitors.length / 2)) ||
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
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        {/* TitleWrapper */}
        <div className="flex items-center justify-start mb-5 w-full">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          <h1 className="font-pt-h2-semibold text-hub-black-1 m-0 text-lg sm:text-xl lg:text-2xl">AI 분석 결과</h1>
        </div>

        {/* ContentWrapper - 반응형 레이아웃 */}
        <div className="flex flex-col lg:flex-row lg:gap-10 w-full">
          {/* MainContent */}
          <div className="flex-1 min-w-0 text-left select-text">
            {/* BmcImageWrapper - 반응형 이미지 */}
            {bmcImageUrl && (
              <div className="w-full max-w-[700px] mb-6 lg:mb-10 self-start">
                <img
                  src={bmcImageUrl}
                  alt="BMC"
                  className="w-full h-auto rounded-[10px] border border-hub-gray-3"
                />
              </div>
            )}

            {/* BmcSidebar - 모바일에서는 BMC 이미지 바로 아래 */}
            <div className="lg:hidden w-full mb-6">
              <BmcSidebar userBmc={{ ...userBmc, id: bmcId }} />
            </div>

            <UserScaleSection userScale={userScale} />

            {/* Section - 반응형 */}
            {(domesticCompetitors.length > 0 || foreignCompetitors.length > 0) && (
              <section className="w-full pb-5 text-left select-text">
                <h3 className="text-base sm:text-lg font-semibold text-hub-black-1 mb-2.5 mt-2.5">
                  경쟁사와의 규모 비교
                </h3>

              {domesticCompetitors.length > 0 && (
                <>
                  <h3 className="text-base sm:text-lg font-semibold text-hub-black-1 mb-2.5 mt-2.5">
                    1. 국내 경쟁사
                  </h3>
                  {/* CompetitorGrid - 반응형 그리드 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                    {domesticCompetitors.map((competitor, index) => (
                      <CompetitorCard key={index} competitor={competitor} />
                    ))}
                  </div>
                </>
              )}

              {foreignCompetitors.length > 0 && (
                <>
                  <h3 className="text-base sm:text-lg font-semibold text-hub-black-1 mb-2.5 mt-2.5">
                    2. 해외 경쟁사
                  </h3>
                  {/* CompetitorGrid - 반응형 그리드 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                    {foreignCompetitors.map((competitor, index) => (
                      <CompetitorCard key={index} competitor={competitor} />
                    ))}
                  </div>
                </>
              )}
              </section>
            )}

            {/* Divider - 반응형 */}
            <div className="w-full h-px mt-5 mb-[30px] bg-hub-gray-2 self-start" />
            <InsightSection strengths={strengths} weaknesses={weaknesses} />
            {/* Divider - 반응형 */}
            <div className="w-full h-px mt-5 mb-[30px] bg-hub-gray-2 self-start" />
            <GlobalExpansionSection globalExpansion={globalExpansionStrategy} />
          </div>

          {/* BmcSidebar - 데스크톱에서만 사이드바로 */}
          <div className="hidden lg:block lg:w-auto lg:flex-shrink-0">
            <BmcSidebar userBmc={{ ...userBmc, id: bmcId }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;