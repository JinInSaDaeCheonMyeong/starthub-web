import { Competitor } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface CompetitorCardProps {
  competitor: Competitor;
}

const CompetitorCard = ({ competitor }: CompetitorCardProps) => (
  // CompetitorCard - 반응형
  <div className="w-full p-4 sm:p-5 border border-hub-gray-3 rounded-lg box-border select-text">
    {/* CompetitorHeader */}
    <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
      {/* CompetitorLogo */}
      <img
        src={competitor.logoUrl || "/assets/images/default-business.svg"}
        alt={`${competitor.name} logo`}
        className="w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-[8px] sm:rounded-[10px] object-contain flex-shrink-0"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = "/assets/images/default-business.svg";
        }}
      />
      {/* CompetitorName */}
      <p className="font-pt-body2-semibold text-sm sm:text-base mb-0">{competitor.name}</p>
    </div>

    {/* InfoBox — 예상 규모 */}
    <div className="flex flex-col items-start gap-2 p-3 sm:p-4 rounded-[8px] sm:rounded-[10px] bg-white border border-hub-gray-3 mb-3 sm:mb-4">
      <p className="font-pt-body2-medium text-hub-gray-2 text-xs sm:text-sm">예상 규모</p>
      <span className="font-pt-body2-semibold text-hub-black-1 text-xs sm:text-sm">
        {formatTextWithBold(competitor.estimatedScale, true)}
      </span>
    </div>

    {/* InfoBox — 시장 점유율 */}
    <div className="flex flex-col items-start gap-2 p-3 sm:p-4 rounded-[8px] sm:rounded-[10px] bg-white border border-hub-gray-3 mb-3 sm:mb-4">
      <p className="font-pt-body2-medium text-hub-gray-2 text-xs sm:text-sm">시장 점유율</p>
      <span className="font-pt-body2-semibold text-hub-black-1 text-xs sm:text-sm">
        {formatTextWithBold(competitor.marketShare, true)}
      </span>
    </div>

    {/* DetailSection — 유사점 */}
    <div className="mb-2 sm:mb-2.5">
      <p className="font-pt-caption1-medium text-hub-gray-2 mb-1 sm:mb-1.5 text-xs">유사점:</p>
      <p className="text-xs text-hub-black-1 leading-[1.4] sm:leading-[1.5]">
        {formatTextWithBold(competitor.similarities.join(", "), true)}
      </p>
    </div>

    {/* DetailSection — 차이점 */}
    <div className="mb-2 sm:mb-2.5">
      <p className="font-pt-caption1-medium text-hub-gray-2 mb-1 sm:mb-1.5 text-xs">차이점:</p>
      <p className="text-xs text-hub-black-1 leading-[1.4] sm:leading-[1.5]">
        {formatTextWithBold(competitor.differences.join(", "), true)}
      </p>
    </div>
  </div>
);

export default CompetitorCard;
