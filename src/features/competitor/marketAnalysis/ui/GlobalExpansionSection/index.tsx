import { GlobalExpansionStrategy } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface GlobalExpansionSectionProps {
  globalExpansion: GlobalExpansionStrategy;
}

const GlobalExpansionSection: React.FC<GlobalExpansionSectionProps> = ({
  globalExpansion,
}) => {
  console.log("GlobalExpansionSection data:", globalExpansion);

  if (!globalExpansion) {
    return null;
  }

  return (
    <section className="w-full pb-5 text-left">
      <p className="font-pt-h1-semibold text-hub-black-1 mb-5">
        3. 해외 시장 진출 및 사업화 방안
      </p>

      <div className="flex flex-col gap-[30px] mb-[30px]">
        <div className="relative">
          <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
            우선 진출 시장
          </h3>
          {globalExpansion?.priorityMarkets?.map((market, index) => {
            if (market.startsWith('<<') && market.includes('>>')) {
              const blocks = market.match(/<<[^>]+>>/g) || [];

              return blocks.map((block, blockIndex) => {
                const cleanedBlock = block.replace(/^<<|>>$/g, '').trim();

                const lines = cleanedBlock.split('\n').map(l => l.trim()).filter(l => l);
                const title = lines[0] || cleanedBlock;
                const description = lines.slice(1).join(' ');

                return (
                  <div
                    key={`${index}-${blockIndex}`}
                    className="p-5 rounded-[10px] bg-hub-white-1 border border-hub-gray-3 mb-2.5"
                  >
                    <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2">
                      {formatTextWithBold(title)}
                    </h4>
                    {description && (
                      <p className="font-pt-caption1-regular text-hub-gray-1">
                        {description}
                      </p>
                    )}
                  </div>
                );
              });
            }

            else {
              const lines = market.split('\n').map(l => l.trim()).filter(l => l);

              const title = lines[0];
              const description = lines.slice(1).join(' ');

              return (
                <div
                  key={index}
                  className="p-5 rounded-[10px] bg-hub-white-1 border border-hub-gray-3 mb-2.5"
                >
                  <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2">
                    {formatTextWithBold(title)}
                  </h4>
                  {description && (
                    <p className="font-pt-caption1-regular text-hub-gray-1">
                      {formatTextWithBold(description)}
                    </p>
                  )}
                </div>
              );
            }
          }).flat()}
        </div>
      </div>

      <div className="flex flex-col gap-[30px] mb-[30px]">
        <div className="relative">
          <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
            진입 전략
          </h3>
          {globalExpansion?.entryStrategies?.map((strategy, index) => (
            <div
              key={index}
              className="p-5 rounded-[10px] bg-hub-white-1 border border-hub-gray-3 mb-2.5"
            >
              <p className="text-sm font-medium text-hub-black-1 leading-[1.5]">
                {formatTextWithBold(strategy)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
          현지화 요구사항
        </h3>
        <div className="flex flex-col gap-[11px]">
          {globalExpansion?.localizationRequirements?.map(
            (requirement, index) => (
              <div
                key={index}
                className="p-5 rounded-[10px] bg-white border border-[#dbdbdb]"
              >
                <p className="text-sm font-medium text-hub-black-1 leading-[1.5]">
                  {formatTextWithBold(requirement)}
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="relative mt-[30px]">
        <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
          파트너십
        </h3>
        <div className="flex flex-col gap-[11px]">
          {globalExpansion?.partnershipOpportunities?.map(
            (opportunity, index) => (
              <div
                key={index}
                className="p-5 rounded-[10px] bg-white border border-[#dbdbdb]"
              >
                <p className="text-sm font-medium text-hub-black-1 leading-[1.5]">
                  {formatTextWithBold(opportunity)}
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="relative mt-[30px]">
        <h3 className="font-pt-body1-semibold text-hub-primary mb-2.5">
          예상 도전과제
        </h3>
        <div className="flex flex-col gap-[11px]">
          {globalExpansion?.expectedChallenges?.map((challenge, index) => (
            <div
              key={index}
              className="p-5 rounded-[10px] bg-white border border-[#dbdbdb]"
            >
              <p className="text-sm font-medium text-hub-black-1 leading-[1.5]">
                {formatTextWithBold(challenge)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalExpansionSection;
