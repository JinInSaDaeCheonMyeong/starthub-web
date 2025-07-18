import React from "react";
import * as S from "./style";
import { JOB_CATEGORY } from "@/shared/utils/Category/jobCategory";
import { BusinessFormData } from "@/entities/user/model/business";

interface BusinessEditModeProps {
  formData: BusinessFormData;
  onInputChange: (field: keyof BusinessFormData, value: string | number) => void;
}

const BusinessEditMode: React.FC<BusinessEditModeProps> = ({
  formData,
  onInputChange
}) => {

  return (
    <S.EditContainer>
      <S.FormGrid>
        <S.FormGroup>
          <S.Label>
            기업명<S.Required>*</S.Required>
          </S.Label>
          <S.Input
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder="기업명을 입력해주세요"
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>
            카테고리<S.Required>*</S.Required>
          </S.Label>
          <S.SelectInput
            value={formData.category}
            onChange={(e) => onInputChange("category", e.target.value)}
          >
            <option value="">카테고리를 선택하세요</option>
            {JOB_CATEGORY.map(category => (
              <option key={category.enum} value={category.enum}>
                {category.text}
              </option>
            ))}
          </S.SelectInput>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>
            기업 설명<S.Required>*</S.Required>
          </S.Label>
          <S.TextArea
            value={formData.companyDescription}
            onChange={(e) => onInputChange("companyDescription", e.target.value)}
            placeholder="기업에 대한 설명을 입력해주세요"
            rows={4}
          />
        </S.FormGroup>

        <S.FormRow>
          <S.FormGroup>
            <S.Label>
              기업 이메일<S.Required>*</S.Required>
            </S.Label>
            <S.Input
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              placeholder="contact@company.com"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>기업 전화번호<S.Required>*</S.Required></S.Label>
            <S.Input
              type="tel"
              value={formData.tel}
              onChange={(e) => onInputChange("tel", e.target.value)}
              placeholder="02-1234-5678"
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormGroup>
          <S.Label>
            기업 인원<S.Required>*</S.Required>
          </S.Label>
          <S.Input
            type="number"
            value={formData.employeeCount || ""}
            onChange={(e) => onInputChange("employeeCount", parseInt(e.target.value) || 0)}
            placeholder="직원 수를 입력해주세요"
            min="1"
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>기업 사이트 주소<S.Required>*</S.Required></S.Label>
          <S.Input
            type="url"
            value={formData.pageUrl}
            onChange={(e) => onInputChange("pageUrl", e.target.value)}
            placeholder="https://www.company.com"
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>기업 위치<S.Required>*</S.Required></S.Label>
          <S.AddressInputGroup>
            <S.AddressInput
              value={formData.address}
              onChange={(e) => onInputChange("address", e.target.value)}
              placeholder="기업 주소를 입력해주세요"
            />
          </S.AddressInputGroup>
        </S.FormGroup>
      </S.FormGrid>
    </S.EditContainer>
  );
};

export default BusinessEditMode;