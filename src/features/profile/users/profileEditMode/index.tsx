import * as S from "./style";
import { ProfileFormData } from "@/entities/user/model/types";

interface ProfileEditModeProps {
  formData: ProfileFormData;
  onInputChange: (field: keyof ProfileFormData, value: string) => void;
}

const ProfileEditMode = ({ formData, onInputChange }: ProfileEditModeProps) => {
  const parseBirthDate = (birthDate: string) => {
    if (!birthDate) return { year: "", month: "", day: "" };
    
    const [year, month, day] = birthDate.split('-');
    return {
      year: year || "",
      month: month || "",
      day: day || ""
    };
  };

  const { year, month, day } = parseBirthDate(formData.birthDate);

  const handleBirthDateChange = (type: 'year' | 'month' | 'day', value: string) => {
    const currentDate = parseBirthDate(formData.birthDate);
    const newDate = { ...currentDate, [type]: value };
    
    if (newDate.year && newDate.month && newDate.day) {
      const formattedDate = `${newDate.year}-${newDate.month.padStart(2, '0')}-${newDate.day.padStart(2, '0')}`;
      onInputChange('birthDate', formattedDate);
    }
  };

  return (
    <S.ProfileFields>
      <S.FieldContainer>
        <S.Label>이름</S.Label>
        <S.ProfileInput
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
        />
      </S.FieldContainer>

      <S.FieldContainer>
        <S.Label>소개</S.Label>
        <S.Textarea
          placeholder="자신을 소개해주세요"
          value={formData.introduction}
          onChange={(e) => onInputChange('introduction', e.target.value)}
        />
      </S.FieldContainer>

      <S.FieldContainer>
        <S.Label>성별</S.Label>
        <S.Select
          value={formData.gender}
          onChange={(e) => onInputChange('gender', e.target.value as "" | "남자" | "여자")}
        >
          <option value="">성별을 선택하세요</option>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </S.Select>
      </S.FieldContainer>

      <S.FieldContainer>
        <S.Label>생년월일</S.Label>
        <S.SelectContainer>
          <S.SelectItem
            value={year}
            onChange={(e) => handleBirthDateChange('year', e.target.value)}
          >
            <option value="">년</option>
            {Array.from({length: 50}, (_, i) => 2024 - i).map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </S.SelectItem>
          <S.SelectItem
            value={month}
            onChange={(e) => handleBirthDateChange('month', e.target.value)}
          >
            <option value="">월</option>
            {Array.from({length: 12}, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>{month}월</option>
            ))}
          </S.SelectItem>
          <S.SelectItem
            value={day}
            onChange={(e) => handleBirthDateChange('day', e.target.value)}
          >
            <option value="">일</option>
            {Array.from({length: 31}, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>{day}일</option>
            ))}
          </S.SelectItem>
        </S.SelectContainer>
      </S.FieldContainer>

      <S.FieldContainer>
        <S.DisabledLabel>이메일</S.DisabledLabel>
        <S.DisabledInput
          disabled
          type="email"
          value={formData.email}
          readOnly
        />
      </S.FieldContainer>
    </S.ProfileFields>
  );
};

export default ProfileEditMode;