"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { StartHubLogo } from "@/assets/logo";
import CategorySelector from "@/features/onboarding/categorySelector";
import { StartHubButton } from "@/shared/ui";
import EarlyOnboarding from "@/features/onboarding/earlyOnboarding";
import { useEarlyOnboarding } from "@/shared/hooks/Onboarding/useEarlyOnboarding";
import { OnboardingRequest } from "@/entities/user/model/types";

interface EarlyOnboardingData {
  companyName: string;
  companyDescription: string;
  numberOfEmployees: number;
  companyWebsite: string;
  startupLocation: string;
  annualRevenue: number;
}

const Onboarding = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [earlyData, setEarlyData] = useState<EarlyOnboardingData | null>(null);
  const earlyOnboardingMutation = useEarlyOnboarding();

  const handleCategoryToggle = (categoryId: string) => {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleEarlyOnboardingSubmit = (data: EarlyOnboardingData) => {
    setEarlyData(data);
  };

  const handleFinalSubmit = () => {
    if (!earlyData) {
      toast.error("회사 정보가 없습니다.");
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
      startupStatus: "EARLY_STAGE",
      startupHistory: 0,
      companyName: earlyData.companyName,
      companyDescription: earlyData.companyDescription,
      numberOfEmployees: earlyData.numberOfEmployees,
      companyWebsite: earlyData.companyWebsite,
      startupLocation: earlyData.startupLocation,
      annualRevenue: earlyData.annualRevenue,
    };

    earlyOnboardingMutation.mutate(onboardingData, {
      onSuccess: () => {
        sessionStorage.removeItem("onboardingBasicInfo");
        router.push("/");
      },
    });
  };

  const isValid =
    earlyData?.companyName?.trim() &&
    earlyData?.numberOfEmployees > 0 &&
    categories.length > 0;

  return (
    <div className="flex justify-center items-center min-h-screen bg-hub-white-2 p-5">
      <div className="w-full max-w-[500px] bg-hub-white-1 rounded-[30px] p-[45px] md:p-[30px] sm:p-5">
        <div className="flex flex-col items-center mb-10">
          <StartHubLogo width={143} height={55} />
          <div className="font-pt-body1-semibold text-center text-hub-black-1 mt-4">
            더 나은 서비스 품질을 위해 정보를 입력해주세요!
          </div>
        </div>

        <div className="px-10">
          <EarlyOnboarding onSubmit={handleEarlyOnboardingSubmit} />

          <CategorySelector
            selectedCategories={categories}
            onCategoryToggle={handleCategoryToggle}
          />

          <StartHubButton
            text="시작하기"
            onClick={handleFinalSubmit}
            height={50}
            backgroundColor={
              isValid ? "#2466F4" : "#F3F4F6"
            }
            textTheme="#FFFFFF"
            disabled={!isValid || earlyOnboardingMutation.isPending}
            className="font-pt-body1-semibold w-100%"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
