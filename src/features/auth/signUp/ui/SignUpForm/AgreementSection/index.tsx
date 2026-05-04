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
    <>
      <div className="flex items-center gap-[10px] my-[5px] w-full max-w-[320px]">
        <StartHubCheckBox checked={isAllChecked} onChange={onAllCheck} />
        <label className="flex-grow text-hub-black-1 font-pt-body2-regular">
          전체 동의
        </label>
      </div>

      <div className="w-full max-w-[320px] h-[1px] bg-hub-gray-3" />

      {SIGNUP_AGREE_ITEMS.map((agree, index) => (
        <div
          key={index}
          className="flex items-center gap-[10px] my-[5px] w-full max-w-[320px]"
        >
          <StartHubCheckBox
            checked={checkedItems[index]}
            onChange={(checked) => onSingleCheck(index, checked)}
          />
          <label className="flex-1 mr-[8px] text-hub-gray-2 font-pt-caption1-regular">
            {agree}
          </label>
        </div>
      ))}
    </>
  );
};

export default AgreementSection;
