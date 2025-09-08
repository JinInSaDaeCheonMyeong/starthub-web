import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as S from "./style";
import { StartHubLogo } from "@/assets/logo";
import {
  OnboardingFormData,
  OnboardingRequest,
} from "@/entities/user/model/types";
import PersonalInfoForm from "@/features/onboarding/personalInfoForm";
import { StartHubButton } from "@/shared/ui";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { userApi } from "@/entities/user/api/user";

const INITIAL_FORM_DATA: OnboardingFormData = {
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  gender: "",
  name: "",
  status: "예비",
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState<OnboardingFormData>(INITIAL_FORM_DATA);

  const onboardingMutation = useMutation({
    mutationFn: (data: OnboardingRequest) => userApi.onboarding(data),
    onSuccess: () => {
      toast.success("설정이 완료되었습니다!");
      navigate("/");
    },
    onError: () => {
      toast.error("다시 시도해 주세요");
    },
  });

  const handleInputChange = (
    field: keyof OnboardingFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const isFormValid = () => {
    const { birthYear, birthMonth, birthDay, gender, name } = formData;
    return birthYear && birthMonth && birthDay && gender && name;
  };

  const formatBirthDate = () => {
    const { birthYear, birthMonth, birthDay } = formData;
    return `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(
      2,
      "0"
    )}`;
  };


  const createServerData = (): OnboardingRequest => ({
    username: formData.name.trim(),
    introduction: "",
    birth: formatBirthDate(),
    gender: formData.gender.toUpperCase() as "MALE" | "FEMALE",
    interests: [],
    profileImage: "",
  });

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast.error("모든 필수 항목을 입력해주세요.");
      return;
    }

    const serverData = createServerData();
    onboardingMutation.mutate(serverData);
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
            text={onboardingMutation.isPending ? "처리중..." : "시작하기"}
            onClick={handleSubmit}
            height={50}
            backgroundColor={StartHubColors.Primary}
            typography={StartHubFont.Pretendard.Body1.SemiBold}
            textTheme={StartHubColors.White1}
            disabled={!isFormValid() || onboardingMutation.isPending}
            customStyle={{ width: "100%" }}
          />
        </S.SectionContainer>
      </S.OnboardingForm>
    </S.OnboardingContainer>
  );
};

export default Onboarding;
