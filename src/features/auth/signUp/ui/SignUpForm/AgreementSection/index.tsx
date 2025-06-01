import * as S from "./style";
import { StartHubCheckBox } from "@/shared/ui";
import { useState } from "react";
import { SIGNUP_AGREE_ITEMS } from "@/features/auth/signUp/constants/signup.constants";

const AgreementSection = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(SIGNUP_AGREE_ITEMS.length).fill(false)
  );

  // 전체 동의 체크박스 핸들러
  const handleAllCheck = (checked: boolean) => {
    setIsAllChecked(checked);
    setCheckedItems(new Array(SIGNUP_AGREE_ITEMS.length).fill(checked));
  };

  // 개별 체크박스 핸들러
  const handleSingleCheck = (index: number, checked: boolean) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = checked;
    setCheckedItems(newCheckedItems);

    const allChecked = newCheckedItems.every((item) => item);
    setIsAllChecked(allChecked);
  };

  return (
    <>
      <S.CheckboxContainer>
        <StartHubCheckBox checked={isAllChecked} onChange={handleAllCheck} />
        <S.CheckboxLabelMain>전체 동의</S.CheckboxLabelMain>
      </S.CheckboxContainer>
      <S.Divider />
      {SIGNUP_AGREE_ITEMS.map((agree, index) => (
        <S.CheckboxContainer key={index}>
          <StartHubCheckBox
            checked={checkedItems[index]}
            onChange={(checked) => handleSingleCheck(index, checked)}
          />
          <S.CheckboxLabel>{agree}</S.CheckboxLabel>
        </S.CheckboxContainer>
      ))}
    </>
  );
};

export default AgreementSection;
