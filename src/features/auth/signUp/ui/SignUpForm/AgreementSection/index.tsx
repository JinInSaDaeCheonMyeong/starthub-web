import * as S from "./style";
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
      <S.CheckboxContainer>
        <StartHubCheckBox checked={isAllChecked} onChange={onAllCheck} />
        <S.CheckboxLabelMain>전체 동의</S.CheckboxLabelMain>
      </S.CheckboxContainer>
      <S.Divider />
      {SIGNUP_AGREE_ITEMS.map((agree, index) => (
        <S.CheckboxContainer key={index}>
          <StartHubCheckBox
            checked={checkedItems[index]}
            onChange={(checked) => onSingleCheck(index, checked)}
          />
          <S.CheckboxLabel>{agree}</S.CheckboxLabel>
        </S.CheckboxContainer>
      ))}
    </>
  );
};

export default AgreementSection;
