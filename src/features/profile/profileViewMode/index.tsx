import * as S from "./style";
import type { ProfileFormData } from "@/entities/user/model/types";

interface ProfileViewModeProps {
  formData?: ProfileFormData;
}

const ProfileViewMode = ({ formData }: ProfileViewModeProps) => {

  return (
    <S.ProfileFields>
      <S.InfoRow>
        <S.InfoLabel>성별</S.InfoLabel>
        <S.InfoValue>{formData?.gender || '-'}</S.InfoValue>
      </S.InfoRow>
      
      <S.InfoRow>
        <S.InfoLabel>생년월일</S.InfoLabel>
        <S.InfoValue>{formData?.birthDate || '-'}</S.InfoValue>
      </S.InfoRow>
      
      <S.InfoRow>
        <S.InfoLabel>이메일 주소</S.InfoLabel>
        <S.InfoValue>{formData?.email || '-'}</S.InfoValue>
      </S.InfoRow>
    </S.ProfileFields>
  );
};

export default ProfileViewMode;