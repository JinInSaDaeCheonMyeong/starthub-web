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
        <div className="flex items-center justify-start mb-5 w-full">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          <h1 className="font-pt-h2-semibold text-hub-black-1 m-0 text-lg sm:text-xl lg:text-2xl">AI 분석 결과</h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-10 w-full">
          <div className="flex-1 min-w-0 text-left select-text">
            {bmcImageUrl && (
              <div className="w-full max-w-[700px] mb-6 lg:mb-10 self-start">
                <img
                  src={bmcImageUrl}
                  alt="BMC"
                  className="w-full h-auto rounded-[10px] border border-hub-gray-3"
                />
              </div>
            )}

            <div className="lg:hidden w-full mb-6">
              <BmcSidebar userBmc={{ ...userBmc, id: bmcId }} />
            </div>

            <UserScaleSection userScale={userScale} />

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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                    {foreignCompetitors.map((competitor, index) => (
                      <CompetitorCard key={index} competitor={competitor} />
                    ))}
                  </div>
                </>
              )}
              </section>
            )}

            <div className="w-full h-px mt-5 mb-[30px] bg-hub-gray-2 self-start" />
            <InsightSection strengths={strengths} weaknesses={weaknesses} />
            <div className="w-full h-px mt-5 mb-[30px] bg-hub-gray-2 self-start" />
            <GlobalExpansionSection globalExpansion={globalExpansionStrategy} />
          </div>

          <div className="hidden lg:block lg:w-auto lg:flex-shrink-0">
            <BmcSidebar userBmc={{ ...userBmc, id: bmcId }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;