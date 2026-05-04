import { Competitor } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface CompetitorCardProps {
  competitor: Competitor;
}

const CompetitorCard = ({ competitor }: CompetitorCardProps) => (
  // CompetitorCard
  <div className="w-[340px] p-5 border border-hub-gray-3 rounded-lg box-border select-text">
    {/* CompetitorHeader */}
    <div className="flex items-center gap-2.5 mb-4">
      {/* CompetitorLogo */}
      <img
        src={competitor.logoUrl || "/assets/images/default-business.svg"}
        alt={`${competitor.name} logo`}
        className="w-[50px] h-[50px] rounded-[10px] object-contain"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = "/assets/images/default-business.svg";
        }}
      />
      {/* CompetitorName */}
      <p className="font-pt-body2-semibold mb-2.5">{competitor.name}</p>
    </div>

    {/* InfoBox — 예상 규모 */}
    <div className="flex flex-col items-start gap-2 p-5 rounded-[10px] bg-white border border-hub-gray-3 mb-4">
      <p className="font-pt-body2-medium text-hub-gray-2">예상 규모</p>
      <span className="font-pt-body2-semibold text-hub-black-1">
        {formatTextWithBold(competitor.estimatedScale, true)}
      </span>
    </div>

    {/* InfoBox — 시장 점유율 */}
    <div className="flex flex-col items-start gap-2 p-5 rounded-[10px] bg-white border border-hub-gray-3 mb-4">
      <p className="font-pt-body2-medium text-hub-gray-2">시장 점유율</p>
      <span className="font-pt-body2-semibold text-hub-black-1">
        {formatTextWithBold(competitor.marketShare, true)}
      </span>
    </div>

    {/* DetailSection — 유사점 */}
    <div className="mb-2.5">
      <p className="font-pt-caption1-medium text-hub-gray-2 mb-1.5">유사점:</p>
      <p className="text-xs text-hub-black-1 leading-[1.5]">
        {formatTextWithBold(competitor.similarities.join(", "), true)}
      </p>
    </div>

    {/* DetailSection — 차이점 */}
    <div className="mb-2.5">
      <p className="font-pt-caption1-medium text-hub-gray-2 mb-1.5">차이점:</p>
      <p className="text-xs text-hub-black-1 leading-[1.5]">
        {formatTextWithBold(competitor.differences.join(", "), true)}
      </p>
    </div>
  </div>
);

export default CompetitorCard;
