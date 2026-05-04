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
    (_, i) => new Date().getFullYear() - i,
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const titleClass = "font-pt-body2-medium text-hub-black-1 mb-2.5";
  const descClass = "font-pt-caption2-regular text-hub-primary mb-4";
  const selectClass = `
    w-full h-[50px] px-[15px] border border-hub-gray-3 rounded-[10px]
    font-pt-caption1-regular bg-hub-white-1
    focus:outline-none focus:border-hub-primary
  `;

  const SelectButton = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`
        py-[15px] w-full h-[50px] rounded-[10px] font-pt-caption1-regular
        cursor-pointer transition-all duration-200
        ${
          active
            ? "border border-hub-primary bg-[#2466F410] text-hub-primary hover:border-hub-primary"
            : "border border-hub-gray-3 bg-hub-white-1 text-hub-gray-3 hover:border-hub-gray-2"
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <>
      {/* 생년월일 섹션 */}
      <div className="mb-8">
        <p className={titleClass}>생년월일</p>
        <p className={descClass}>
          생일을 알려주시면, 더 나은 콘텐츠를 추천해드릴 수 있어요!
        </p>
        <div className="grid grid-cols-3 gap-4">
          <select
            value={formData.birthYear}
            onChange={(e) => onInputChange("birthYear", e.target.value)}
            className={selectClass}
          >
            <option value="">년</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={formData.birthMonth}
            onChange={(e) => onInputChange("birthMonth", e.target.value)}
            className={selectClass}
          >
            <option value="">월</option>
            {months.map((month) => (
              <option key={month} value={month.toString()}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={formData.birthDay}
            onChange={(e) => onInputChange("birthDay", e.target.value)}
            className={selectClass}
          >
            <option value="">일</option>
            {days.map((day) => (
              <option key={day} value={day.toString()}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 성별 섹션 */}
      <div className="mb-8">
        <p className={titleClass}>성별</p>
        <p className={descClass}>
          성별을 알려주시면, 더 나은 콘텐츠를 추천해드릴 수 있어요!
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <SelectButton
            active={formData.gender === "male"}
            onClick={() => onInputChange("gender", "male")}
          >
            남자
          </SelectButton>
          <SelectButton
            active={formData.gender === "female"}
            onClick={() => onInputChange("gender", "female")}
          >
            여자
          </SelectButton>
        </div>
      </div>

      {/* 이름 섹션 */}
      <div className="mb-8">
        <p className={titleClass}>이름</p>
        <p className={descClass}>이름은 한글로 두 글자 이상 입력해 주세요.</p>
        <StartHubTextField
          type="text"
          value={formData.name}
          placeholder="이름을 입력해주세요"
          onChange={(e) => onInputChange("name", e.target.value)}
          className="height-50px width-100%"
        />
      </div>

      {/* 창업 상태 섹션 */}
      <div className="mb-8">
        <p className={titleClass}>창업 상태</p>
        <p className={descClass}>
          창업 상태를 알려주시면, 더 나은 콘텐츠를 추천해드릴 수 있어요!
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <SelectButton
            active={formData.status === "초기"}
            onClick={() => onInputChange("status", "초기")}
          >
            초기 창업
          </SelectButton>
          <SelectButton
            active={formData.status === "예비"}
            onClick={() => onInputChange("status", "예비")}
          >
            예비 창업
          </SelectButton>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
