import { StartHubTextField } from "@/shared/ui";
import { useState, useEffect } from "react";
import LocationSelector from "@/shared/ui/LocationSelector/LocationSelector";

interface EarlyOnboardingData {
  companyName: string;
  companyDescription: string;
  numberOfEmployees: number;
  companyWebsite: string;
  startupLocation: string;
  annualRevenue: number;
}

interface EarlyOnboardingProps {
  onSubmit?: (data: EarlyOnboardingData) => void;
}

const EarlyOnboarding = ({ onSubmit }: EarlyOnboardingProps) => {
  const [formData, setFormData] = useState<EarlyOnboardingData>({
    companyName: "",
    companyDescription: "",
    numberOfEmployees: 0,
    companyWebsite: "",
    startupLocation: "",
    annualRevenue: 0,
  });

  useEffect(() => {
    onSubmit?.(formData);
  }, [formData]);

  const titleClass = "font-pt-body2-medium text-hub-black-1";
  const requiredClass = "text-hub-primary";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>
          회사명 <span className={requiredClass}>*</span>
        </p>
        <StartHubTextField
          type="text"
          value={formData.companyName}
          placeholder="회사명을 입력해주세요"
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          width={340}
          className="h-[50px]"
          autoComplete="organization"
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>
          기업 설명 <span className={requiredClass}>*</span>
        </p>
        <StartHubTextField
          type="text"
          value={formData.companyDescription}
          placeholder="기업을 설명해주세요"
          onChange={(e) =>
            setFormData({ ...formData, companyDescription: e.target.value })
          }
          width={340}
          className="h-[50px]"
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>
          기업 인원 <span className={requiredClass}>*</span>
        </p>
        <div className="relative w-full">
          <StartHubTextField
            type="number"
            value={
              formData.numberOfEmployees === 0
                ? ""
                : String(formData.numberOfEmployees)
            }
            placeholder="기업 인원을 입력해주세요"
            onChange={(e) => {
              const value = e.target.value === "" ? 0 : Number(e.target.value);
              setFormData({
                ...formData,
                numberOfEmployees: value < 0 ? 0 : value,
              });
            }}
            width={340}
            className="h-[50px] pr-8"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 5.25L7 8.75L10.5 5.25"
                stroke="#CFCFCF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>기업 사이트</p>
        <StartHubTextField
          type="text"
          value={formData.companyWebsite}
          placeholder="기업 사이트 주소를 입력해주세요"
          onChange={(e) =>
            setFormData({ ...formData, companyWebsite: e.target.value })
          }
          width={340}
          className="h-[50px]"
          autoComplete="url"
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        <p className="font-pt-body2-medium text-hub-black-1">창업 위치</p>
        <LocationSelector
          onChange={(location) =>
            setFormData((prev) => ({ ...prev, startupLocation: location }))
          }
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>연매출액</p>
        <div className="relative w-full">
          <select
            value={formData.annualRevenue}
            onChange={(e) =>
              setFormData({
                ...formData,
                annualRevenue: Number(e.target.value),
              })
            }
            className="w-full h-[50px] px-5 border border-hub-gray-3 rounded-[10px] font-pt-caption1-regular bg-white text-hub-black-1 focus:outline-none focus:border-hub-primary appearance-none cursor-pointer hover:border-hub-gray-2 transition-colors pr-8"
          >
            <option value={0}>연매출액을 선택해주세요</option>
            <option value={10000000}>1천만원 미만</option>
            <option value={50000000}>1천만원 - 5천만원</option>
            <option value={100000000}>5천만원 - 1억원</option>
            <option value={500000000}>1억원 - 5억원</option>
            <option value={1000000000}>5억원 - 10억원</option>
            <option value={5000000000}>10억원 - 50억원</option>
            <option value={10000000000}>50억원 이상</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 5.25L7 8.75L10.5 5.25"
                stroke="#CFCFCF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EarlyOnboarding as default, type EarlyOnboardingProps };
