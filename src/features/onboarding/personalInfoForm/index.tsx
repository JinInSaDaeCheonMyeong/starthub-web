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

  const titleClass = "font-pt-body2-medium text-hub-black-1";
  const descClass = "font-pt-caption2-regular text-hub-primary mt-1";
  const selectClass = `
    w-full h-[50px] px-5 border border-hub-gray-3 rounded-[10px]
    font-pt-caption1-regular bg-white text-hub-black-1
    focus:outline-none focus:border-hub-primary
    appearance-none cursor-pointer
    hover:border-hub-gray-2 transition-colors
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
      type="button"
      onClick={onClick}
      style={active ? {
        backgroundColor: 'rgba(36, 102, 244, 0.1)',
        borderColor: '#2466F4',
        color: '#2466F4'
      } : {}}
      className={`
        flex items-center justify-center
        w-full h-[50px] rounded-[10px] font-pt-caption1-regular
        cursor-pointer transition-all duration-200
        ${
          active
            ? ""
            : "border border-hub-gray-3 bg-white text-hub-gray-3 hover:border-hub-gray-2"
        }
        ${!active ? "" : "border"}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col gap-5">
      {/* 생년월일 섹션 */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col">
          <p className={titleClass}>생년월일</p>
          <p className={descClass}>
            생일을 알려주시면, 더 나은 콘텐츠를 추천해드릴 수 있어요!
          </p>
        </div>
        <div className="flex gap-[11px]">
          <div className="relative flex-1">
            <select
              value={formData.birthYear}
              onChange={(e) => onInputChange("birthYear", e.target.value)}
              className={selectClass + " pr-8"}
            >
              <option value="">년</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#CFCFCF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="relative flex-1">
            <select
              value={formData.birthMonth}
              onChange={(e) => onInputChange("birthMonth", e.target.value)}
              className={selectClass + " pr-8"}
            >
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month.toString()}>
                  {month}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#CFCFCF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="relative flex-1">
            <select
              value={formData.birthDay}
              onChange={(e) => onInputChange("birthDay", e.target.value)}
              className={selectClass + " pr-8"}
            >
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day.toString()}>
                  {day}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#CFCFCF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 성별 섹션 */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col">
          <p className={titleClass}>성별</p>
          <p className={descClass}>
            성별을 알려주시면, 더 나은 콘텐츠를 추천해드릴 수 있어요!
          </p>
        </div>
        <div className="flex gap-[10px]">
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
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col">
          <p className={titleClass}>이름</p>
          <p className={descClass}>이름은 한글로 두 글자 이상 입력해 주세요.</p>
        </div>
        <StartHubTextField
          type="text"
          value={formData.name}
          placeholder="이름을 입력해주세요"
          onChange={(e) => onInputChange("name", e.target.value)}
          width={340}
          className="h-[50px]"
          autoComplete="name"
        />
      </div>

      {/* 창업 상태 섹션 */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col">
          <p className={titleClass}>창업 상태</p>
        </div>
        <div className="flex gap-[10px]">
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
    </div>
  );
};

export default PersonalInfoForm;
