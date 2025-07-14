import React, { useState } from 'react';
import { useOnboarding } from '@/shared/hooks/OnBoarding/useOnboarding';
import PersonalInfoForm from '../personalInfoForm';
import * as S from "./style"
import CategorySelector from '../categorySelector';
import { OnboardingFormData, OnboardingRequest } from '@/entities/user/model/types';

const OnboardingPage = () => {
    const [formData, setFormData] = useState<OnboardingFormData>({
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      gender: "",
      name: "",
      category: [],
      interests: [],
    });
  
    const onboardingMutation = useOnboarding();
  
    const handleInputChange = (field: keyof OnboardingFormData, value: string) => {
      console.log(`Input 변경: ${field} = ${value}`);
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };
  
    const handleCategoryToggle = (categoryId: string) => {
      console.log(`카테고리 토글: ${categoryId}`);
      setFormData(prev => {
        const isSelected = prev.category.includes(categoryId);
        const newCategory = isSelected
          ? prev.category.filter(id => id !== categoryId)
          : [...prev.category, categoryId];  
        
        return {
          ...prev,
          category: newCategory
        };
      });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();    
      
      if (!formData.name || !formData.birthYear || !formData.birthMonth || 
          !formData.birthDay || !formData.gender || formData.category.length === 0) {
        alert('모든 필드를 입력해주세요.');
        return;
      }
  
      try {
        const serverData: OnboardingRequest = {
          username: formData.name,
          introduction: "",
          birth: `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`,
          gender: formData.gender.toUpperCase(),
          interests: formData.category,
          profileImage: ""
        };

        const response = await onboardingMutation.mutateAsync(serverData);
        
        console.log('온보딩 응답:', response);
      } catch (error) {
        console.error('온보딩 실패:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <PersonalInfoForm 
          formData={formData}
          onInputChange={handleInputChange}
        />
        
        <CategorySelector 
          selectedCategories={formData.category}
          onCategoryToggle={handleCategoryToggle}
        />
        <S.SubmitButton
          type="submit" 
          disabled={onboardingMutation.isPending}
        >
          {onboardingMutation.isPending ? '처리중...' : '시작하기'}
        </S.SubmitButton>
        
      </form>
    );
  };
  
  export default OnboardingPage;