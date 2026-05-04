import { UserScale } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface UserScaleSectionProps {
  userScale: UserScale;
}

const UserScaleSection: React.FC<UserScaleSectionProps> = ({ userScale }) => {
  return (
    // Section
    <section className="max-w-[700px] pb-5 text-left">
      {/* SectionTitle */}
      <p className="font-pt-h1-semibold text-hub-black-1 mb-5">
        1. 사용자 규모 분석
      </p>

      {/* CardGrid */}
      <div className="flex gap-2.5 mb-5">
        {/* Card — 예상 사용자 기반 규모 */}
        <div className="flex-1">
          <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2.5">
            예상 사용자 기반 규모
          </h4>
          <div className="p-5 rounded-[10px] border border-hub-gray-3">
            <p className="font-pt-body2-medium text-hub-black-1">
              {formatTextWithBold(userScale.estimatedUserBase, true)}
            </p>
          </div>
        </div>

        {/* Card — 시장 내 위치 */}
        <div className="flex-1">
          <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2.5">
            시장 내 위치
          </h4>
          <div className="p-5 rounded-[10px] border border-hub-gray-3">
            <p className="font-pt-body2-medium text-hub-black-1">
              {formatTextWithBold(userScale.marketPosition, true)}
            </p>
          </div>
        </div>

        {/* Card — 성장 잠재력 */}
        <div className="flex-1">
          <h4 className="font-pt-body2-semibold text-hub-black-1 mb-2.5">
            성장 잠재력
          </h4>
          <div className="p-5 rounded-[10px] border border-hub-gray-3">
            <p className="font-pt-body2-medium text-hub-black-1">
              {formatTextWithBold(userScale.growthPotential, true)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserScaleSection;
