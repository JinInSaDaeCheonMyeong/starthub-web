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

  // BMC 3번처럼 데이터가 하나의 문자열로 들어오는 경우를 처리
  let parsedUserScale = { ...userScale };

  // estimatedUserBase가 여러 정보를 포함한 하나의 문자열인 경우
  if (userScale.estimatedUserBase && !userScale.marketPosition && !userScale.growthPotential) {
    const fullText = userScale.estimatedUserBase;
    const parts = fullText.split(/예상 사용자 기반 규모|시장 내 위치|성장 잠재력/).filter(p => p.trim());

    console.log("Parsing single string data:", { fullText, parts });

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
    // Section
    <section className="max-w-[700px] pb-5 text-left">
      {/* SectionTitle */}
      <p className="font-pt-h1-semibold text-hub-black-1 mb-5">
        1. 사용자 규모 분석
      </p>

      {/* CardGrid - 반응형: 모바일 세로, 데스크탑 가로 */}
      <div className="flex flex-col lg:flex-row lg:gap-2.5 gap-5 mb-5">
        {/* Card — 예상 사용자 기반 규모 */}
        {displayScale.estimatedUserBase && (
          <div className="w-full lg:flex-1">
            <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2.5">
              예상 사용자 기반 규모
            </h4>
            <div className="p-5 rounded-[10px] border border-hub-gray-3">
              <p className="font-pt-body2-medium text-hub-black-1">
                {(() => {
                  // 줄바꿈으로 구분된 데이터 처리
                  const text = displayScale.estimatedUserBase.trim();
                  const lines = text.split(/[\n\r]+/).map(l => l.trim()).filter(l => l);

                  // 디버깅
                  console.log('estimatedUserBase raw:', displayScale.estimatedUserBase);
                  console.log('estimatedUserBase lines:', lines);

                  if (lines.length > 1) {
                    // 여러 줄인 경우 첫 줄은 제목으로 표시
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
                  // 한 줄인 경우 그대로 표시
                  return formatTextWithBold(displayScale.estimatedUserBase, true);
                })()}
              </p>
            </div>
          </div>
        )}

        {/* Card — 시장 내 위치 */}
        {displayScale.marketPosition && (
          <div className="w-full lg:flex-1">
            <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2.5">
              시장 내 위치
            </h4>
            <div className="p-5 rounded-[10px] border border-hub-gray-3">
              <p className="font-pt-body2-medium text-hub-black-1">
                {(() => {
                  // 줄바꿈으로 구분된 데이터 처리
                  const text = displayScale.marketPosition.trim();
                  const lines = text.split(/[\n\r]+/).map(l => l.trim()).filter(l => l);

                  // 디버깅
                  console.log('marketPosition raw:', displayScale.marketPosition);
                  console.log('marketPosition lines:', lines);

                  if (lines.length > 1) {
                    // 여러 줄인 경우 첫 줄은 제목으로 표시
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
                  // 한 줄인 경우 그대로 표시
                  return formatTextWithBold(displayScale.marketPosition, true);
                })()}
              </p>
            </div>
          </div>
        )}

        {/* Card — 성장 잠재력 */}
        {displayScale.growthPotential && (
          <div className="w-full lg:flex-1">
            <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2.5">
              성장 잠재력
            </h4>
            <div className="p-5 rounded-[10px] border border-hub-gray-3">
              <p className="font-pt-body2-medium text-hub-black-1">
                {(() => {
                  // 줄바꿈으로 구분된 데이터 처리
                  const text = displayScale.growthPotential.trim();
                  const lines = text.split(/[\n\r]+/).map(l => l.trim()).filter(l => l);

                  // 디버깅
                  console.log('growthPotential raw:', displayScale.growthPotential);
                  console.log('growthPotential lines:', lines);

                  if (lines.length > 1) {
                    // 여러 줄인 경우 첫 줄은 제목으로 표시
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
                  // 한 줄인 경우 그대로 표시
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
