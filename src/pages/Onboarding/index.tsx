import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as S from "./style";
import { StartHubLogo } from "@/assets/logo";
import { OnboardingFormData, OnboardingRequest } from "@/entities/user/model/types";
import PersonalInfoForm from "@/features/onboarding/personalInfoForm";
import CategorySelector from "@/features/onboarding/categorySelector";
import { StartHubButton } from "@/shared/ui";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { userApi } from "@/entities/user/api/user";
import { JOB_CATEGORY } from "@/shared/utils/Category/jobCategory";

const INITIAL_FORM_DATA: OnboardingFormData = {
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  gender: "",
  name: "",
  category: [],
  interests: [],
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_FORM_DATA);

  const handleInputChange = (field: keyof OnboardingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (categories: string[]) => {
    setFormData(prev => ({ ...prev, category: categories }));
  };

  const isFormValid = () => {
    const { birthYear, birthMonth, birthDay, gender, name, category } = formData;
    return birthYear && birthMonth && birthDay && gender && name && category.length > 0;
  }; 

  const formatBirthDate = () => {
    const { birthYear, birthMonth, birthDay } = formData;
    return `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
  };

  const convertToServerFormat = (categoryId: string): string => {
    const category = JOB_CATEGORY.find(cat => cat.enum === categoryId);
    return category?.enum || categoryId;
  };

  const createServerData = (): OnboardingRequest => ({
    username: formData.name.trim(),
    introduction: "",
    birth: formatBirthDate(),
    gender: formData.gender.toUpperCase() as "MALE" | "FEMALE",
    interests: formData.category.map(convertToServerFormat),
    profileImage: ""
  });

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error("모든 필수 항목을 입력해주세요.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const serverData = createServerData();
      await userApi.onboarding(serverData);
      
      toast.success("회원가입이 완료되었습니다!");
      navigate('/');
    } catch (error: unknown) {
      toast.error("다시 시도해 주세요");
    } finally {
      setIsSubmitting(false);
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
          <CategorySelector
            selectedCategories={formData.category}
            onCategoryChange={handleCategoryChange}
          />
          
          <StartHubButton
            text={isSubmitting ? "처리중..." : "시작하기"}
            onClick={handleSubmit}
            height={50}
            backgroundColor={StartHubColors.Primary}
            typography={StartHubFont.Pretendard.Body1.SemiBold}
            textTheme={StartHubColors.White1}
            disabled={!isFormValid() || isSubmitting}
            customStyle={{ width: "100%" }}
          />
        </S.SectionContainer>
      </S.OnboardingForm>
    </S.OnboardingContainer>
  );
};

export default Onboarding;