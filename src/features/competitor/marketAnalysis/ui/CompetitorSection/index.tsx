import React from "react";
import { Competitor, UserBmc } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";
import BmcSidebar from "../BmcSidebar";
import defaultLogo from "@assets/images/default=business.svg";

interface CompetitorSectionProps {
  domesticCompetitors: Competitor[];
  foreignCompetitors: Competitor[];
  userBmc: UserBmc;
}

const CompetitorSection: React.FC<CompetitorSectionProps> = ({
  domesticCompetitors,
  foreignCompetitors,
  userBmc,
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = (defaultLogo as any).src;
  };

  const renderCompetitorCards = (competitorList: Competitor[]) => (
    // CompetitorGrid
    <div className="flex flex-wrap gap-5 justify-start w-[700px]">
      {competitorList.map((competitor, index) => (
        // CompetitorCard
        <div
          key={index}
          className="w-[340px] p-5 border border-hub-gray-3 rounded-lg box-border select-text"
        >
          {/* CompetitorHeader */}
          <div className="flex items-center gap-2.5 mb-4">
            <img
              src={competitor.logoUrl || (defaultLogo as any).src}
              alt={`${competitor.name} logo`}
              onError={handleImageError}
              className="w-[50px] h-[50px] rounded-[10px] object-cover"
            />
            {/* CompetitorName */}
            <p className="font-pt-body2-semibold mb-2.5">{competitor.name}</p>
          </div>

          {/* InfoBox — 예상 규모 */}
          <div className="flex flex-col items-start gap-2 p-5 rounded-[10px] bg-white border border-hub-gray-3 mb-4">
            <p className="font-pt-body2-medium text-hub-gray-2">예상 규모</p>
            <span className="font-pt-body2-semibold text-hub-black-1">
              {formatTextWithBold(competitor.estimatedScale)}
            </span>
          </div>

          {/* InfoBox — 시장 점유율 */}
          <div className="flex flex-col items-start gap-2 p-5 rounded-[10px] bg-white border border-hub-gray-3 mb-4">
            <p className="font-pt-body2-medium text-hub-gray-2">시장 점유율</p>
            <span className="font-pt-body2-semibold text-hub-black-1">
              {formatTextWithBold(competitor.marketShare)}
            </span>
          </div>

          {/* DetailSection — 유사점 */}
          <div className="mb-2.5">
            <p className="font-pt-caption1-medium text-hub-gray-2 mb-1.5 select-text">
              유사점:
            </p>
            <p className="text-xs text-hub-black-1 leading-[1.5]">
              {formatTextWithBold(competitor.similarities.join(", "))}
            </p>
          </div>

          {/* DetailSection — 차이점 */}
          <div className="mb-2.5">
            <p className="font-pt-caption1-medium text-hub-gray-2 mb-1.5 select-text">
              차이점:
            </p>
            <p className="text-xs text-hub-black-1 leading-[1.5]">
              {formatTextWithBold(competitor.differences.join(", "))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    // CompetitorSectionWrapper
    <div className="flex gap-10 max-w-[1200px]">
      {/* CompetitorContent */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-hub-black-1 mb-2.5 mt-2.5">
          경쟁사와의 규모 비교
        </h3>

        {domesticCompetitors?.length > 0 && (
          <>
            <h3 className="text-base font-semibold text-hub-black-1 mb-2.5 mt-2.5">
              1. 국내 경쟁사
            </h3>
            {renderCompetitorCards(domesticCompetitors)}
          </>
        )}

        {foreignCompetitors?.length > 0 && (
          <>
            <h3 className="text-base font-semibold text-hub-black-1 mb-2.5 mt-2.5">
              2. 해외 경쟁사
            </h3>
            {renderCompetitorCards(foreignCompetitors)}
          </>
        )}
      </div>

      <BmcSidebar userBmc={userBmc} />
    </div>
  );
};

export default CompetitorSection;
