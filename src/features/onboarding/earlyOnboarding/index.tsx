import { StartHubTextField } from "@/shared/ui";
import { useState, useEffect } from "react";

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
  }, [formData, onSubmit]);

  const titleClass = "font-pt-body2-medium text-hub-black-1 mb-2.5";
  const requiredClass = "text-hub-primary text-sm";

  return (
    // Section
    <div className="mb-8">
      <h3 className={titleClass}>
        회사명 <span className={requiredClass}>*</span>
      </h3>
      <StartHubTextField
        type="text"
        value={formData.companyName}
        placeholder="회사명을 입력해주세요"
        onChange={(e) =>
          setFormData({ ...formData, companyName: e.target.value })
        }
        className="height-50px w-100%"
      />

      <h3 className={titleClass}>기업 설명</h3>
      <StartHubTextField
        type="text"
        value={formData.companyDescription}
        placeholder="기업을 설명해주세요"
        onChange={(e) =>
          setFormData({ ...formData, companyDescription: e.target.value })
        }
        className="height-50px w-100%"
      />

      <h3 className={titleClass}>
        기업 인원 <span className={requiredClass}>*</span>
      </h3>
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
        className="height-50px w-100%"
      />

      <h3 className={titleClass}>기업 사이트</h3>
      <StartHubTextField
        type="text"
        value={formData.companyWebsite}
        placeholder="기업 사이트 주소를 입력해주세요"
        onChange={(e) =>
          setFormData({ ...formData, companyWebsite: e.target.value })
        }
        className="height-50px w-100%"
      />

      <h3 className={titleClass}>창업 위치</h3>
      <StartHubTextField
        type="text"
        value={formData.startupLocation}
        placeholder="창업 위치를 입력해주세요"
        onChange={(e) =>
          setFormData({ ...formData, startupLocation: e.target.value })
        }
        className="height-50px w-100%"
      />

      <h3 className={titleClass}>연매출액</h3>
      <StartHubTextField
        type="number"
        value={
          formData.annualRevenue === 0 ? "" : String(formData.annualRevenue)
        }
        placeholder="연매출액을 입력해주세요"
        onChange={(e) => {
          const value = e.target.value === "" ? 0 : Number(e.target.value);
          setFormData({ ...formData, annualRevenue: value < 0 ? 0 : value });
        }}
        className="height-50px w-100%"
      />
    </div>
  );
};

export { EarlyOnboarding as default, type EarlyOnboardingProps };
