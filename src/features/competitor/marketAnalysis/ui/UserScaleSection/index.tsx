import { UserScale } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface UserScaleSectionProps {
  userScale: UserScale;
}

const UserScaleSection: React.FC<UserScaleSectionProps> = ({ userScale }) => {
  console.log("UserScaleSection data:", userScale);

  if (!userScale) {
    return null;
  }

  let parsedUserScale = { ...userScale };

  if (userScale.estimatedUserBase && !userScale.marketPosition && !userScale.growthPotential) {
    const fullText = userScale.estimatedUserBase;
    const parts = fullText.split(/예상 사용자 기반 규모|시장 내 위치|성장 잠재력/).filter(p => p.trim());


    if (parts.length >= 3) {
      parsedUserScale = {
        estimatedUserBase: parts[0].trim(),
        marketPosition: parts[1].trim(),
        growthPotential: parts[2].trim(),
        competitorComparison: userScale.competitorComparison,
        domesticCompetitors: userScale.domesticCompetitors,
        foreignCompetitors: userScale.foreignCompetitors
      };
    }
  }

  const displayScale = parsedUserScale;

  return (
    <section className="max-w-[700px] pb-5 text-left">
      <p className="font-pt-h1-semibold text-hub-black-1 mb-5">
        1. 사용자 규모 분석
      </p>

      <div className="flex flex-col lg:flex-row lg:gap-2.5 gap-5 mb-5">
        {displayScale.estimatedUserBase && (
          <div className="w-full lg:flex-1">
            <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2.5">
              예상 사용자 기반 규모
            </h4>
            <div className="p-5 rounded-[10px] border border-hub-gray-3">
              <p className="font-pt-body2-medium text-hub-black-1">
                {(() => {
                  const text = displayScale.estimatedUserBase.trim();
                  const lines = text.split(/[\n\r]+/).map(l => l.trim()).filter(l => l);

                  if (lines.length > 1) {
                    return (
                      <>
                        <strong>{formatTextWithBold(lines[0], true)}</strong>
                        {lines.slice(1).map((line, idx) => (
                          <span key={idx}>
                            <br />
                            {formatTextWithBold(line, true)}
                          </span>
                        ))}
                      </>
                    );
                  }
                  return formatTextWithBold(displayScale.estimatedUserBase, true);
                })()}
              </p>
            </div>
          </div>
        )}

        {displayScale.marketPosition && (
          <div className="w-full lg:flex-1">
            <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2.5">
              시장 내 위치
            </h4>
            <div className="p-5 rounded-[10px] border border-hub-gray-3">
              <p className="font-pt-body2-medium text-hub-black-1">
                {(() => {
                  const text = displayScale.marketPosition.trim();
                  const lines = text.split(/[\n\r]+/).map(l => l.trim()).filter(l => l);

                  if (lines.length > 1) {
                    return (
                      <>
                        <strong>{formatTextWithBold(lines[0], true)}</strong>
                        {lines.slice(1).map((line, idx) => (
                          <span key={idx}>
                            <br />
                            {formatTextWithBold(line, true)}
                          </span>
                        ))}
                      </>
                    );
                  }
                  return formatTextWithBold(displayScale.marketPosition, true);
                })()}
              </p>
            </div>
          </div>
        )}

        {displayScale.growthPotential && (
          <div className="w-full lg:flex-1">
            <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2.5">
              성장 잠재력
            </h4>
            <div className="p-5 rounded-[10px] border border-hub-gray-3">
              <p className="font-pt-body2-medium text-hub-black-1">
                {(() => {
                  const text = displayScale.growthPotential.trim();
                  const lines = text.split(/[\n\r]+/).map(l => l.trim()).filter(l => l);


                  if (lines.length > 1) {
                    return (
                      <>
                        <strong>{formatTextWithBold(lines[0], true)}</strong>
                        {lines.slice(1).map((line, idx) => (
                          <span key={idx}>
                            <br />
                            {formatTextWithBold(line, true)}
                          </span>
                        ))}
                      </>
                    );
                  }
                  return formatTextWithBold(displayScale.growthPotential, true);
                })()}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserScaleSection;
