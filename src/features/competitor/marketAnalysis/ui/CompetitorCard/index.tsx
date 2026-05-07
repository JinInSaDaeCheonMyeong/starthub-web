import { useState } from "react";
import { Competitor } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface CompetitorCardProps {
  competitor: Competitor;
}

const CompetitorCard = ({ competitor }: CompetitorCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
  // CompetitorCard - 반응형
  <div className="w-full p-4 sm:p-5 border border-hub-gray-3 rounded-lg box-border select-text">
    {/* CompetitorHeader */}
    <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
      {/* CompetitorLogo */}
      <div className="w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-[8px] sm:rounded-[10px] flex-shrink-0 flex items-center justify-center bg-gray-100">
        {(imageLoading || imageError) && !competitor.logoUrl && (
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
        <img
          src={competitor.logoUrl || "/assets/images/default-business.svg"}
          alt={`${competitor.name} logo`}
          className={`w-full h-full rounded-[8px] sm:rounded-[10px] object-contain ${(imageLoading || imageError) && !competitor.logoUrl ? 'hidden' : ''}`}
          onLoad={() => setImageLoading(false)}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.src = "/assets/images/default-business.svg";
            setImageError(true);
            setImageLoading(false);
          }}
        />
      </div>
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
};

export default CompetitorCard;
