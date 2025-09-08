import * as S from "./style";
import { StartHubTextField } from "@/shared/ui";
import { OnboardingFormData } from "@/entities/user/model/types";

interface PersonalInfoFormProps {
  formData: OnboardingFormData;
  onInputChange: (field: keyof OnboardingFormData, value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  onInputChange,
}) => {
  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <>
      {/* 생년월일 섹션 */}
      <S.Section>
        <S.SectionTitle>생년월일</S.SectionTitle>
        <S.SectionDescription>
          생일을 알려주시면, 더 나은 콘텐츠를 추천해드릴 수 있어요!
        </S.SectionDescription>

        <S.SelectGrid>
          <S.Select
            value={formData.birthYear}
            onChange={(e) => onInputChange("birthYear", e.target.value)}
          >
            <option value="">년</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </S.Select>

          <S.Select
            value={formData.birthMonth}
            onChange={(e) => onInputChange("birthMonth", e.target.value)}
          >
            <option value="">월</option>
            {months.map((month) => (
              <option key={month} value={month.toString()}>
                {month}
              </option>
            ))}
          </S.Select>

          <S.Select
            value={formData.birthDay}
            onChange={(e) => onInputChange("birthDay", e.target.value)}
          >
            <option value="">일</option>
            {days.map((day) => (
              <option key={day} value={day.toString()}>
                {day}
              </option>
            ))}
          </S.Select>
        </S.SelectGrid>
      </S.Section>

      {/* 성별 섹션 */}
      <S.Section>
        <S.SectionTitle>성별</S.SectionTitle>
        <S.SectionDescription>
          성별을 알려주시면, 더 나은 콘텐츠를 추천해드릴 수 있어요!
        </S.SectionDescription>

        <S.ButtonGrid>
          <S.SelectButton
            $active={formData.gender === "male"}
            onClick={() => onInputChange("gender", "male")}
          >
            남자
          </S.SelectButton>
          <S.SelectButton
            $active={formData.gender === "female"}
            onClick={() => onInputChange("gender", "female")}
          >
            여자
          </S.SelectButton>
        </S.ButtonGrid>
      </S.Section>

      {/* 이름 섹션 */}
      <S.Section>
        <S.SectionTitle>이름</S.SectionTitle>
        <S.SectionDescription>
          이름은 한글로 두 글자 이상 입력해 주세요.
        </S.SectionDescription>
        <StartHubTextField
          type="text"
          value={formData.name}
          placeholder="이름을 입력해주세요"
          onChange={(e) => onInputChange("name", e.target.value)}
          customStyle={{ height: 50, width: "100%" }}
        />
      </S.Section>
      <S.Section>
        <S.SectionTitle>창업 상태</S.SectionTitle>
        <S.SectionDescription>
          창업 상태를 알려주시면, 더 나은 콘텐츠를 추천해드릴 수 있어요!
        </S.SectionDescription>

        <S.ButtonGrid>
          <S.SelectButton
            $active={formData.status === "초기"}
            onClick={() => onInputChange("status", "초기")}
          >
            초기 창업
          </S.SelectButton>
          <S.SelectButton
            $active={formData.status === "예비"}
            onClick={() => onInputChange("status", "예비")}
          >
            예비 창업
          </S.SelectButton>
        </S.ButtonGrid>
      </S.Section>
    </>
  );
};

export default PersonalInfoForm;