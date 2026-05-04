import { StartHubTextField } from "@/shared/ui";
import { useState } from "react";

interface PreOnboardingData {
  startupLocation: string;
}

interface PreOnboardingProps {
  onSubmit?: (data: PreOnboardingData) => void;
}

const PreOnboarding = ({ onSubmit }: PreOnboardingProps) => {
  const [formData, setFormData] = useState<PreOnboardingData>({
    startupLocation: "",
  });

  const handleChange = (value: string) => {
    const newData = { startupLocation: value };
    setFormData(newData);
    onSubmit?.(newData);
  };

  return (
    <div className="mb-8">
      <p className="font-pt-body2-medium text-hub-black-1 mb-2.5">창업 위치</p>
      <StartHubTextField
        type="text"
        value={formData.startupLocation}
        placeholder="창업 위치를 입력해주세요"
        onChange={(e) => handleChange(e.target.value)}
        className="height-50px w-100%"
      />
    </div>
  );
};

export default PreOnboarding;
