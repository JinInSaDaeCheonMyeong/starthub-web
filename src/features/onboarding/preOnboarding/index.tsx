import { StartHubTextField } from "@/shared/ui";
import * as S from "./style";
import { useState } from "react";

const EarlyOnboarding = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    employeeCount: 0,
    companyWebsite: "",
    startupLocation: "",
    annualRevenue: 0,
  });

  return (
    <S.Section>
      <S.SectionTitle>창업 위치</S.SectionTitle>
      <StartHubTextField
        type="text"
        value={formData.startupLocation}
        placeholder="창업 위치를 입력해주세요"
        onChange={(e) =>
          setFormData({ ...formData, startupLocation: e.target.value })
        }
        customStyle={{ height: 50, width: "100%" }}
      />
    </S.Section>
  );
};

export default EarlyOnboarding;
