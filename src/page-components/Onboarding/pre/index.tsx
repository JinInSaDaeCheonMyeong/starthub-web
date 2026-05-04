"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { StartHubLogo } from "@/assets/logo";
import CategorySelector from "@/features/onboarding/categorySelector";
import { StartHubButton } from "@/shared/ui";
import PreOnboarding from "@/features/onboarding/preOnboarding";
import { usePreOnboarding } from "@/shared/hooks/Onboarding/usePreOnboarding";
import { OnboardingRequest } from "@/entities/user/model/types";

interface PreOnboardingData {
  startupLocation: string;
}

const Onboarding = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [preData, setPreData] = useState<PreOnboardingData | null>(null);
  const preOnboardingMutation = usePreOnboarding();

  const handleCategoryToggle = (categoryId: string) => {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handlePreOnboardingSubmit = useCallback((data: PreOnboardingData) => {
    setPreData(data);
  }, []);

  const handleFinalSubmit = () => {
    if (!preData) {
      toast.error("창업 위치 정보가 없습니다.");
      return;
    }

    if (categories.length === 0) {
      toast.error("최소 1개 이상의 관심 분야를 선택해주세요.");
      return;
    }

    const basicInfoStr = sessionStorage.getItem("onboardingBasicInfo");
    if (!basicInfoStr) {
      toast.error("기본 정보를 찾을 수 없습니다. 처음부터 다시 시작해주세요.");
      router.push("/onboarding");
      return;
    }

    const basicInfo = JSON.parse(basicInfoStr);

    const onboardingData: OnboardingRequest = {
      ...basicInfo,
      startupFields: categories.map((category) => ({
        businessType: category,
      })),
      startupStatus: "PRE_STARTUP",
      startupHistory: 0,
      startupLocation: preData.startupLocation,
    };

    preOnboardingMutation.mutate(onboardingData, {
      onSuccess: () => {
        sessionStorage.removeItem("onboardingBasicInfo");
        router.push("/");
      },
    });
  };

  const isValid = preData?.startupLocation?.trim() && categories.length > 0;

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
            <PreOnboarding onSubmit={handlePreOnboardingSubmit} />

            <CategorySelector
              selectedCategories={categories}
              onCategoryToggle={handleCategoryToggle}
            />

            <StartHubButton
              text="다음"
              onClick={handleFinalSubmit}
              height={50}
              backgroundColor={isValid ? "#2466F4" : "#F3F4F6"}
              className="font-pt-body1-semibold w-full rounded-[10px]"
              textTheme={isValid ? "#FFFFFF" : "#9B9B9B"}
              disabled={!isValid || preOnboardingMutation.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
