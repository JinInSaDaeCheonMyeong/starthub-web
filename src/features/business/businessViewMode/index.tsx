import React from "react";
import * as S from "./style";
import { BusinessFormData } from "@/entities/user/model/business";
import { getCategoryInfo } from "@/shared/utils/Category/jobCategory";

interface BusinessViewModeProps {
  formData: BusinessFormData;
}

const BusinessViewMode: React.FC<BusinessViewModeProps> = ({ formData }) => {
  const categoryInfo = getCategoryInfo(formData.category);

  return (
    <S.ViewContainer>
      <S.InfoSection>
        <S.InfoRow>
          <S.InfoLabel>기업명</S.InfoLabel>
          <S.InfoValue>{formData.name}</S.InfoValue>
        </S.InfoRow>

        <S.InfoRow>
          <S.InfoLabel>카테고리</S.InfoLabel>
          <S.InfoValue>
            <S.CategoryContainer>
              <S.CategoryIcon style={{ color: categoryInfo.txColor }}>
                {categoryInfo.image}
              </S.CategoryIcon>
              {categoryInfo.text}
            </S.CategoryContainer>
          </S.InfoValue>
        </S.InfoRow>

        <S.InfoRow>
          <S.InfoLabel>기업 설명</S.InfoLabel>
          <S.InfoValue>
            {formData.companyDescription || "설명이 없습니다"}
          </S.InfoValue>
        </S.InfoRow>

        <S.InfoRow>
          <S.InfoLabel>기업 이메일</S.InfoLabel>
          <S.InfoValue>
            {formData.email ? (
              <a href={`mailto:${formData.email}`}>{formData.email}</a>
            ) : (
              "이메일이 없습니다"
            )}
          </S.InfoValue>
        </S.InfoRow>

        <S.InfoRow>
          <S.InfoLabel>연락처</S.InfoLabel>
          <S.InfoValue>{formData.tel || "연락처가 없습니다"}</S.InfoValue>
        </S.InfoRow>

        <S.InfoRow>
          <S.InfoLabel>기업 인원</S.InfoLabel>
          <S.InfoValue>{formData.employeeCount}명</S.InfoValue>
        </S.InfoRow>

        <S.InfoRow>
          <S.InfoLabel>기업 사이트</S.InfoLabel>
          <S.InfoValue>
            {formData.pageUrl ? (
              <a href={formData.pageUrl} target="_blank" rel="noopener noreferrer">
                {formData.pageUrl}
              </a>
            ) : (
              "사이트 주소가 없습니다"
            )}
          </S.InfoValue>
        </S.InfoRow>

        <S.InfoRow>
          <S.InfoLabel>기업 위치</S.InfoLabel>
          <S.InfoValue>{formData.address || "위치 정보가 없습니다"}</S.InfoValue>
        </S.InfoRow>
      </S.InfoSection>
    </S.ViewContainer>
  );
};

export default BusinessViewMode;