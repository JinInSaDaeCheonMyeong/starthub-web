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
      <S.SectionTitle>회사명 <S.Required>*</S.Required></S.SectionTitle>
      <StartHubTextField
        type="text"
        value={formData.companyName}
        placeholder="회사명을 입력해주세요"
        onChange={(e) =>
          setFormData({ ...formData, companyName: e.target.value })
        }
        customStyle={{ height: 50, width: "100%" }}
      />
      <S.SectionTitle>기업 설명</S.SectionTitle>
      <StartHubTextField
        type="text"
        value={formData.companyDescription}
        placeholder="기업을 설명해주세요"
        onChange={(e) =>
          setFormData({ ...formData, companyDescription: e.target.value })
        }
        customStyle={{ height: 50, width: "100%" }}
      />
      <S.SectionTitle>기업 인원 <S.Required>*</S.Required></S.SectionTitle>
      <StartHubTextField
        type="number"
        value={
          formData.employeeCount === 0 ? "" : String(formData.employeeCount)
        }
        placeholder="기업 인원을 입력해주세요"
        onChange={(e) =>
          setFormData({
            ...formData,
            employeeCount: e.target.value === "" ? 0 : Number(e.target.value),
          })
        }
        customStyle={{ height: 50, width: "100%" }}
      />

      <S.SectionTitle>기업 사이트</S.SectionTitle>
      <StartHubTextField
        type="text"
        value={formData.companyWebsite}
        placeholder="기업 사이트 주소를 입력해주세요"
        onChange={(e) =>
          setFormData({ ...formData, companyWebsite: e.target.value })
        }
        customStyle={{ height: 50, width: "100%" }}
      />
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
      <S.SectionTitle>연매출액 <S.Required>*</S.Required></S.SectionTitle>
      <StartHubTextField
        type="number"
        value={
          formData.annualRevenue === 0 ? "" : String(formData.annualRevenue)
        }
        placeholder="연매출액을 입력해주세요"
        onChange={(e) =>
          setFormData({
            ...formData,
            annualRevenue: e.target.value === "" ? 0 : Number(e.target.value),
          })
        }
        customStyle={{ height: 50, width: "100%" }}
      />
    </S.Section>
  );
};

export default EarlyOnboarding;