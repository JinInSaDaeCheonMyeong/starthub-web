import { GlobalExpansionStrategy } from "../../types";
import { removeAngleBrackets } from "../../utils/textFormatter";

interface GlobalExpansionSectionProps {
  globalExpansion: GlobalExpansionStrategy;
}

const GlobalExpansionSection: React.FC<GlobalExpansionSectionProps> = ({
  globalExpansion,
}) => {
  return (
    // Section
    <section className="w-full pb-5 text-left">
      {/* SectionTitle */}
      <p className="font-pt-h1-semibold text-hub-black-1 mb-5">
        3. 해외 시장 진출 및 사업화 방안
      </p>

      {/* MarketSection — 우선 진출 시장 */}
      <div className="flex flex-col gap-[30px] mb-[30px]">
        <div className="relative">
          <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
            우선 진출 시장
          </h3>
          {globalExpansion.priorityMarkets.map((market, index) => (
            <div
              key={index}
              className="p-5 rounded-[10px] bg-hub-white-1 border border-hub-gray-3 mb-2.5"
            >
              <h4 className="font-pt-caption1-medium text-hub-black-1 mb-2.5">
                {removeAngleBrackets(market)}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* MarketSection — 진입 전략 */}
      <div className="flex flex-col gap-[30px] mb-[30px]">
        <div className="relative">
          <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
            진입 전략
          </h3>
          {globalExpansion.entryStrategies.map((strategy, index) => (
            <div
              key={index}
              className="p-5 rounded-[10px] bg-hub-white-1 border border-hub-gray-3 mb-2.5"
            >
              <p className="text-sm font-medium text-hub-black-1 leading-[1.5]">
                {removeAngleBrackets(strategy)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MarketItem — 현지화 요구사항 */}
      <div className="relative">
        <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
          현지화 요구사항
        </h3>
        <div className="flex flex-col gap-[11px]">
          {globalExpansion.localizationRequirements.map(
            (requirement, index) => (
              <div
                key={index}
                className="p-5 rounded-[10px] bg-white border border-[#dbdbdb]"
              >
                <p className="text-sm font-medium text-hub-black-1 leading-[1.5]">
                  {removeAngleBrackets(requirement)}
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* MarketItem — 파트너십 */}
      <div className="relative mt-[30px]">
        <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
          파트너십
        </h3>
        <div className="flex flex-col gap-[11px]">
          {globalExpansion.partnershipOpportunities.map(
            (opportunity, index) => (
              <div
                key={index}
                className="p-5 rounded-[10px] bg-white border border-[#dbdbdb]"
              >
                <p className="text-sm font-medium text-hub-black-1 leading-[1.5]">
                  {removeAngleBrackets(opportunity)}
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* MarketItem — 예상 도전과제 */}
      <div className="relative mt-[30px]">
        <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
          예상 도전과제
        </h3>
        <div className="flex flex-col gap-[11px]">
          {globalExpansion.expectedChallenges.map((challenge, index) => (
            <div
              key={index}
              className="p-5 rounded-[10px] bg-white border border-[#dbdbdb]"
            >
              <p className="text-sm font-medium text-hub-black-1 leading-[1.5]">
                {removeAngleBrackets(challenge)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalExpansionSection;
