import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { StartHubLogo } from "@/assets/logo";
import CategorySelector from "@/features/onboarding/categorySelector";
import { StartHubButton } from "@/shared/ui";
import { StartHubColors, StartHubFont } from "@/shared/design";
import PreOnboarding from "@/features/onboarding/preOnboarding";
import { usePreOnboarding } from "@/shared/hooks/Onboarding/usePreOnboarding";
import { OnboardingRequest } from "@/entities/user/model/types";

interface PreOnboardingData {
  startupLocation: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [preData, setPreData] = useState<PreOnboardingData | null>(null);
  const preOnboardingMutation = usePreOnboarding();

  const handleCategoryToggle = (categoryId: string) => {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePreOnboardingSubmit = (data: PreOnboardingData) => {
    setPreData(data);
  };

  const handleFinalSubmit = () => {
    if (preData && categories.length > 0) {
      const basicInfoStr = sessionStorage.getItem("onboardingBasicInfo");
      const basicInfo = basicInfoStr ? JSON.parse(basicInfoStr) : {};

      const onboardingData: OnboardingRequest = {
        ...basicInfo,
        interests: categories,
        startupLocation: preData.startupLocation,
      };
      
      preOnboardingMutation.mutate(onboardingData, {
        onSuccess: () => {
          sessionStorage.removeItem("onboardingBasicInfo");
          navigate("/");
        }
      });
    }
  };

  const isValid = preData?.startupLocation?.trim() && categories.length > 0;

  return (
    <S.OnboardingContainer>
      <S.OnboardingForm>
        <S.LogoSection>
          <StartHubLogo width={143} height={55} />
          <S.Label>더 나은 서비스 품질을 위해 정보를 입력해주세요!</S.Label>
        </S.LogoSection>

        <S.SectionContainer>
          <PreOnboarding onSubmit={handlePreOnboardingSubmit} />

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
            disabled={!isValid || preOnboardingMutation.isPending}
          />
        </S.SectionContainer>
      </S.OnboardingForm>
    </S.OnboardingContainer>
  );
};

export default Onboarding;
