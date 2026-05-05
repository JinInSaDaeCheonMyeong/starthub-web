"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { StartHubLogo } from "@/assets/logo";
import { OnboardingFormData } from "@/entities/user/model/types";
import PersonalInfoForm from "@/features/onboarding/personalInfoForm";
import { StartHubButton } from "@/shared/ui";

const INITIAL_FORM_DATA: OnboardingFormData = {
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  gender: "",
  name: "",
  status: null,
};

const Onboarding = () => {
  const router = useRouter();
  const [formData, setFormData] =
    useState<OnboardingFormData>(INITIAL_FORM_DATA);

  const handleInputChange = (
    field: keyof OnboardingFormData,
    value: string,
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
      "0",
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
      router.push("/onboarding/pre-startup");
    } else if (formData.status === "초기") {
      router.push("/onboarding/early-startup");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] px-4 py-8 md:px-6 lg:px-8">
      <div className="w-full max-w-[490px] bg-white rounded-[30px] px-6 py-12 sm:px-8 md:px-[74px] md:py-[60px]">
        <div className="flex flex-col items-center gap-5">
          {/* Header */}
          <div className="flex flex-col items-center gap-[10px]">
            <StartHubLogo width={134} height={55} />
            <p className="font-pt-body1-semibold text-center text-hub-black-1 px-4 whitespace-nowrap">
              더 나은 서비스 품질을 위해 정보를 입력해주세요!
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-[340px] flex flex-col gap-5">
            <PersonalInfoForm
              formData={formData}
              onInputChange={handleInputChange}
            />

            <StartHubButton
              text="다음"
              onClick={handleSubmit}
              height={50}
              backgroundColor="#2466F4"
              textTheme="#FFFFFF"
              disabled={!isFormValid()}
              className="font-pt-body1-semibold w-full rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
