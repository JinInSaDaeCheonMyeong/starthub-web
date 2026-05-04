import { StartHubCheckBox } from "@/shared/ui";
import { SIGNUP_AGREE_ITEMS } from "@/features/auth/signUp/constants/signup.constants";

interface AgreementSectionProps {
  checkedItems: boolean[];
  isAllChecked: boolean;
  onAllCheck: (checked: boolean) => void;
  onSingleCheck: (index: number, checked: boolean) => void;
}

const AgreementSection: React.FC<AgreementSectionProps> = ({
  checkedItems,
  isAllChecked,
  onAllCheck,
  onSingleCheck,
}) => {
  return (
    <div className="flex flex-col gap-[10px] w-[320px]">
      {/* All Agree Section */}
      <div className="flex items-center gap-[10px] pb-[10px] border-b border-hub-gray-3">
        <StartHubCheckBox
          checked={isAllChecked}
          onChange={onAllCheck}
        />
        <p className="font-pt-body2-regular text-black">
          전체 동의
        </p>
      </div>

      {/* Individual Agreement Items */}
      <div className="flex flex-col gap-[10px]">
        {SIGNUP_AGREE_ITEMS.map((agree, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-[6px]">
              <StartHubCheckBox
                checked={checkedItems[index]}
                onChange={(checked) => onSingleCheck(index, checked)}
              />
              <p className="font-pt-caption1-regular text-hub-gray-2">
                {agree}
              </p>
            </div>
            <div className="text-hub-gray-3 text-[14px]">
              ›
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgreementSection;
