import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as S from "./style";
import { StartHubLogo } from "@/assets/logo";
import { OnboardingFormData } from "@/entities/user/model/types";
import PersonalInfoForm from "@/features/onboarding/personalInfoForm";
import { StartHubButton } from "@/shared/ui";
import { StartHubColors, StartHubFont } from "@/shared/design";

const INITIAL_FORM_DATA: OnboardingFormData = {
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  gender: "",
  name: "",
  status: null,
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState<OnboardingFormData>(INITIAL_FORM_DATA);

  const handleInputChange = (
    field: keyof OnboardingFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    const { birthYear, birthMonth, birthDay, gender, name, status } = formData;
    return birthYear && birthMonth && birthDay && gender && name && status;
  };

  const formatBirthDate = () => {
    const { birthYear, birthMonth, birthDay } = formData;
    return `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(
      2,
      "0"
    )}`;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast.error("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (!formData.status) {
      toast.error("창업 상태를 선택해주세요.");
      return;
    }

    const basicInfo = {
      username: formData.name.trim(),
      birth: formatBirthDate(),
      gender: formData.gender.toUpperCase() as "MALE" | "FEMALE",
    };
    sessionStorage.setItem("onboardingBasicInfo", JSON.stringify(basicInfo));

    if (formData.status === "예비") {
      navigate("/onboarding/pre-startup");
    } else if (formData.status === "초기") {
      navigate("/onboarding/early-startup");
    }
  };

  return (
    <S.OnboardingContainer>
      <S.OnboardingForm>
        <S.LogoSection>
          <StartHubLogo width={143} height={55} />
          <S.Label>더 나은 서비스 품질을 위해 정보를 입력해주세요!</S.Label>
        </S.LogoSection>

        <S.SectionContainer>
          <PersonalInfoForm
            formData={formData}
            onInputChange={handleInputChange}
          />

          <StartHubButton
            text="다음"
            onClick={handleSubmit}
            height={50}
            backgroundColor={StartHubColors.Primary}
            typography={StartHubFont.Pretendard.Body1.SemiBold}
            textTheme={StartHubColors.White1}
            disabled={!isFormValid()}
            customStyle={{ width: "100%" }}
          />
        </S.SectionContainer>
      </S.OnboardingForm>
    </S.OnboardingContainer>
  );
};

export default Onboarding;
