import React from "react";
import * as S from "./style";
import { BusinessFormData } from "@/entities/user/model/business";

interface BusinessInfoProps {
  formData: BusinessFormData;
  profileImage: string;
  isEditing: boolean;
  onEdit: () => void;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({
  formData,
  profileImage,
}) => {
  return (
    <S.InfoContainer>
      <S.ProfileImageContainer>
        <S.ProfileImage 
          src={profileImage} 
          alt="기업 로고"
        />
      </S.ProfileImageContainer>
      
      <S.BasicInfo>
        <S.CompanyName>{formData.name || "기업명"}</S.CompanyName>
        <S.CompanyDescription>
          {formData.companyDescription || "기업 설명을 입력해주세요"}
        </S.CompanyDescription>
      </S.BasicInfo>
      
    </S.InfoContainer>
  );
};

export default BusinessInfo;