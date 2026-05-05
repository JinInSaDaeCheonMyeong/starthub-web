import { Strengths, Weaknesses } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface InsightSectionProps {
  strengths: Strengths;
  weaknesses: Weaknesses;
}

const InsightSection: React.FC<InsightSectionProps> = ({
  strengths,
  weaknesses,
}) => {
  const opportunityItemClass =
    "py-5 px-4 rounded-[10px] bg-[#fafefc] border border-[#dbfbe7] mb-2.5 last:mb-0";
  const threatItemClass =
    "py-5 px-4 rounded-[10px] bg-[#fefcfb] border border-[#fefcfb] mb-2.5 last:mb-0";

  return (
    // Section
    <section className="w-full pb-5 text-left">
      {/* SectionTitle */}
      <p className="font-pt-h1-semibold text-hub-black-1 mb-5">
        2. 기회/위협 인사이트
      </p>

      {/* InsightGrid - 반응형: 모바일 세로, 데스크탑 가로 */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-[25px] gap-[30px]">
        {/* InsightCard — opportunity */}
        <div className="w-full p-6 rounded-[10px] bg-[#eefdf4] border border-[#d6fae2] select-text">
          <h3 className="font-pt-body1-semibold text-[#14532d] mb-2.5">기회</h3>
          {strengths.competitiveAdvantages.map((advantage, index) => (
            <div key={index} className={opportunityItemClass}>
              <p className="font-pt-caption1-regular text-[#14532d] select-text">
                {formatTextWithBold(advantage)}
              </p>
            </div>
          ))}
          {strengths.uniqueValuePropositions.map((proposition, index) => (
            <div key={index} className={opportunityItemClass}>
              <p className="font-pt-caption1-regular text-[#14532d] select-text">
                {formatTextWithBold(proposition)}
              </p>
            </div>
          ))}
          {strengths.marketOpportunities.map((opportunity, index) => (
            <div key={index} className={opportunityItemClass}>
              <p className="font-pt-caption1-regular text-[#14532d] select-text">
                {formatTextWithBold(opportunity)}
              </p>
            </div>
          ))}
        </div>

        {/* InsightCard — threat */}
        <div className="w-full p-6 rounded-[10px] bg-[#fff6ef] border border-[#ffe8d2] select-text">
          <h3 className="font-pt-body1-semibold text-[#7c2d12] mb-2.5">위협</h3>
          {weaknesses.competitiveDisadvantages.map((disadvantage, index) => (
            <div key={index} className={threatItemClass}>
              <p className="font-pt-caption1-regular text-[#7c2d12] select-text">
                {formatTextWithBold(disadvantage)}
              </p>
            </div>
          ))}
          {weaknesses.marketChallenges.map((challenge, index) => (
            <div key={index} className={threatItemClass}>
              <p className="font-pt-caption1-regular text-[#7c2d12] select-text">
                {formatTextWithBold(challenge)}
              </p>
            </div>
          ))}
          {weaknesses.resourceLimitations.map((limitation, index) => (
            <div key={index} className={threatItemClass}>
              <p className="font-pt-caption1-regular text-[#7c2d12] select-text">
                {formatTextWithBold(limitation)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
