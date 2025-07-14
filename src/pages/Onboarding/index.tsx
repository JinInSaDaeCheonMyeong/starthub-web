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

const Onboarding = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OnboardingFormData>({
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    gender: "",
    name: "",
    category: [],
    interests: [],
  });

  const convertToServerFormat = (categoryId: string): string => {
    const category = JOB_CATEGORY.find(cat => cat.enum === categoryId);
    return category ? category.enum : categoryId;
  };

  const handleInputChange = (field: keyof OnboardingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = 
    formData.birthYear &&
    formData.birthMonth &&
    formData.birthDay &&
    formData.gender &&
    formData.name &&
    formData.category.length > 0;

  const createServerData = (): OnboardingRequest => ({
    username: formData.name.trim(),
    introduction: "",
    birth: `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`,
    gender: formData.gender.toUpperCase() as "MALE" | "FEMALE",
    interests: formData.category.map(convertToServerFormat),
    profileImage: ""
  });

  const getErrorMessage = (error: any): string => {
    if (error.response?.data?.message) return error.response.data.message;
    if (error.message) return error.message;
    return "오류가 발생했습니다. 다시 시도해주세요.";
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("모든 필수 항목을 입력해주세요.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const serverData = createServerData();
      await userApi.onboarding(serverData);
      
      toast.success("회원가입이 완료되었습니다!");
      navigate('/');
    } catch (error: any) {
      toast.error(getErrorMessage(error));
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
          />
          
          <StartHubButton
            text={isSubmitting ? "처리중..." : "시작하기"}
            onClick={handleSubmit}
            height={50}
            backgroundColor={StartHubColors.Primary}
            typography={StartHubFont.Pretendard.Body1.SemiBold}
            textTheme={StartHubColors.White1}
            disabled={!isFormValid || isSubmitting}
            customStyle={{ width: "100%" }}
          />
        </S.SectionContainer>
      </S.OnboardingForm>
    </S.OnboardingContainer>
  );
};

export default Onboarding;