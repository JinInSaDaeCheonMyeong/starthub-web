// import React from "react";
// import * as S from "./style";
// import { BusinessFormData } from "@/entities/user/model/business";
// import { JOB_CATEGORY } from "@/shared/utils/Category/jobCategory";

// interface BusinessRegistrationFormProps {
//   formData: BusinessFormData;
//   onFormChange: (field: keyof BusinessFormData, value: any) => void;
//   onImageClick: () => void;
//   logoImage: string;
// }

// const BusinessRegistrationForm: React.FC<BusinessRegistrationFormProps> = ({
//   formData,
//   onFormChange,
// }) => {
//   return (
//     <S.FormContainer>
//       <S.FormTitle>기업 프로필 등록</S.FormTitle>

//       <S.FormSection>
//         <S.FormGrid>
//           <S.FormField>
//             <S.FormLabel className="required">기업명</S.FormLabel>
//             <S.FormInput
//               type="text"
//               value={formData.name}
//               onChange={(e) => onFormChange("name", e.target.value)}
//               placeholder="기업명을 입력하세요"
//             />
//           </S.FormField>

//           <S.FormField>
//             <S.FormLabel className="required">카테고리</S.FormLabel>
//             <S.FormSelect
//               value={formData.category}
//               onChange={(e) => onFormChange("category", e.target.value)}
//             >
//               <option value="">카테고리를 선택하세요</option>
//               {JOB_CATEGORY.map((category) => (
//                 <option key={category.enum} value={category.enum}>
//                   {category.text}
//                 </option>
//               ))}
//             </S.FormSelect>
//           </S.FormField>

//           <S.FormField className="full-width">
//             <S.FormLabel className="required">기업 설명</S.FormLabel>
//             <S.FormTextarea
//               value={formData.companyDescription}
//               onChange={(e) => onFormChange("companyDescription", e.target.value)}
//               placeholder="기업에 대한 간단한 설명을 입력하세요"
//             />
//           </S.FormField>

//           <S.FormField>
//             <S.FormLabel className="required">기업 이메일</S.FormLabel>
//             <S.FormInput
//               type="email"
//               value={formData.email}
//               onChange={(e) => onFormChange("email", e.target.value)}
//               placeholder="contact@company.com"
//             />
//           </S.FormField>

//           <S.FormField>
//             <S.FormLabel>연락처</S.FormLabel>
//             <S.FormInput
//               type="tel"
//               value={formData.tel}
//               onChange={(e) => onFormChange("tel", e.target.value)}
//               placeholder="010-1234-5678"
//             />
//           </S.FormField>

//           <S.FormField>
//             <S.FormLabel className="required">기업 인원</S.FormLabel>
//             <S.FormInput
//               type="number"
//               value={formData.employeeCount}
//               onChange={(e) => onFormChange("employeeCount", Number(e.target.value))}
//               placeholder="직원 수를 입력하세요"
//               min="1"
//             />
//           </S.FormField>

//           <S.FormField className="full-width">
//             <S.FormLabel>기업 사이트 주소</S.FormLabel>
//             <S.FormInput
//               type="url"
//               value={formData.pageUrl}
//               onChange={(e) => onFormChange("pageUrl", e.target.value)}
//               placeholder="https://www.company.com"
//             />
//           </S.FormField>

//           <S.FormField className="full-width">
//             <S.FormLabel>기업 위치</S.FormLabel>
//             <S.FormInput
//               type="text"
//               value={formData.address}
//               onChange={(e) => onFormChange("address", e.target.value)}
//               placeholder="서울시 강남구 테헤란로 123"
//             />
//           </S.FormField>

//           <S.FormField className="full-width">
//             <S.FormLabel>사업 설명</S.FormLabel>
//             <S.FormTextarea
//               value={formData.businessDescription}
//               onChange={(e) => onFormChange("businessDescription", e.target.value)}
//               placeholder="사업에 대한 자세한 설명을 입력하세요"
//             />
//           </S.FormField>
//         </S.FormGrid>
//       </S.FormSection>
//     </S.FormContainer>
//   );
// };

// export default BusinessRegistrationForm;