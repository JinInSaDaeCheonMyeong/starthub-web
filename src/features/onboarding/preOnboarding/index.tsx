import { StartHubTextField } from "@/shared/ui";
import * as S from "./style";
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
    <S.Section>
      <S.SectionTitle>창업 위치</S.SectionTitle>
      <StartHubTextField
        type="text"
        value={formData.startupLocation}
        placeholder="창업 위치를 입력해주세요"
        onChange={(e) => handleChange(e.target.value)}
        customStyle={{ height: 50, width: "100%" }}
      />
    </S.Section>
  );
};

export { PreOnboarding as default, type PreOnboardingProps };
