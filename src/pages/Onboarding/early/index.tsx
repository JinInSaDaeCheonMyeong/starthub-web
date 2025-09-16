import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { StartHubLogo } from "@/assets/logo";
import CategorySelector from "@/features/onboarding/categorySelector";
import { StartHubButton } from "@/shared/ui";
import { StartHubColors, StartHubFont } from "@/shared/design";
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
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [earlyData, setEarlyData] = useState<EarlyOnboardingData | null>(null);
  const earlyOnboardingMutation = useEarlyOnboarding();

  const handleCategoryToggle = (categoryId: string) => {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleEarlyOnboardingSubmit = (data: EarlyOnboardingData) => {
    setEarlyData(data);
  };

  const handleFinalSubmit = () => {
    if (earlyData && categories.length > 0) {
      const basicInfoStr = sessionStorage.getItem("onboardingBasicInfo");
      const basicInfo = basicInfoStr ? JSON.parse(basicInfoStr) : {};

      const onboardingData: OnboardingRequest = {
        ...basicInfo,
        interests: categories,
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
          navigate("/");
        }
      });
    }
  };

  const isValid = earlyData?.companyName?.trim() && 
                  earlyData?.numberOfEmployees > 0 && 
                  earlyData?.annualRevenue > 0 && 
                  categories.length > 0;

  return (
    <S.OnboardingContainer>
      <S.OnboardingForm>
        <S.LogoSection>
          <StartHubLogo width={143} height={55} />
          <S.Label>더 나은 서비스 품질을 위해 정보를 입력해주세요!</S.Label>
        </S.LogoSection>

        <S.SectionContainer>
          <EarlyOnboarding 
            onSubmit={handleEarlyOnboardingSubmit}
          />

          <CategorySelector
            selectedCategories={categories}
            onCategoryToggle={handleCategoryToggle}
          />

          <StartHubButton
            text="시작하기"
            onClick={handleFinalSubmit}
            height={50}
            backgroundColor={isValid ? StartHubColors.Primary : StartHubColors.Gray4}
            typography={StartHubFont.Pretendard.Body1.SemiBold}
            textTheme={StartHubColors.White1}
            customStyle={{ width: "100%" }}
            disabled={!isValid || earlyOnboardingMutation.isPending}
          />
        </S.SectionContainer>
      </S.OnboardingForm>
    </S.OnboardingContainer>
  );
};

export default Onboarding;
