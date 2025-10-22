import React, { useState, useEffect, useMemo } from "react";
import * as S from "./style";
import { StartHubButton, StartHubTextField } from "@/shared/ui";
import { StartHubFont } from "@/shared/design/text/StartHubFont";
import { StartHubColors } from "@/shared/design";
import SideBar from "@/features/profile/users/sideBar";
import { useNavigate } from "react-router-dom";
import { useProfile, useUpdateProfile } from "@/shared/hooks/Profile";
import {
  INITIAL_FORM_DATA,
  formatProfileToForm,
  formatFormToProfile,
  validateRequiredFields,
  generateYears,
  generateMonths,
  generateDays,
  type ProfileFormData,
} from "../utils/profileFormHelpers";

const EditProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const { data: profileData, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState<ProfileFormData>(INITIAL_FORM_DATA);

  // 프로필 데이터가 로드되면 폼에 채우기
  useEffect(() => {
    if (profileData) {
      setFormData(formatProfileToForm(profileData));
    }
  }, [profileData]);

  // 날짜 선택 옵션 메모이제이션
  const years = useMemo(() => generateYears(), []);
  const months = useMemo(() => generateMonths(), []);
  const days = useMemo(() => generateDays(), []);

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    if (!validateRequiredFields(formData)) {
      return;
    }

    const profileUpdateData = formatFormToProfile(formData);
    updateProfile(profileUpdateData, {
      onSuccess: () => {
        navigate("/my-profile");
      },
    });
  };

  // 로딩 중이면 로딩 UI 표시
  if (isLoading) {
    return (
      <S.Wrapper>
        <SideBar />
        <S.MainContent>
          <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '16px' }}>
            프로필 정보를 불러오는 중...
          </div>
        </S.MainContent>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <SideBar />
      <S.MainContent>
        <S.HeaderSection>
          <S.Motto>"어제의 꿈은 오늘의 희망이며 내일의 현실이다."</S.Motto>
          <S.Greeting>오늘도 잘 부탁드립니다</S.Greeting>
        </S.HeaderSection>

        <S.InfoTable>
            <S.SectionTitle>
              이름 <span>*</span>
            </S.SectionTitle>
            <StartHubTextField
              type="text"
              value={formData.username}
              placeholder="이름을 입력해주세요"
              onChange={(e) => handleChange("username", e.target.value)}
              customStyle={{ height: 50, width: "100%" }}
            />

            <S.SectionTitle>
              성별 <span>*</span>
            </S.SectionTitle>
            <S.Select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              required
            >
              <option value="">성별을 선택해주세요</option>
              <option value="MALE">남</option>
              <option value="FEMALE">여</option>
            </S.Select>

            <S.SectionTitle>
              생년월일 <span>*</span>
            </S.SectionTitle>
            <S.SelectGrid>
              <S.Select
                value={formData.birthYear}
                onChange={(e) => handleChange("birthYear", e.target.value)}
              >
                <option value="">년</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </S.Select>

              <S.Select
                value={formData.birthMonth}
                onChange={(e) => handleChange("birthMonth", e.target.value)}
              >
                <option value="">월</option>
                {months.map((month) => (
                  <option key={month} value={month.toString()}>
                    {month}
                  </option>
                ))}
              </S.Select>

              <S.Select
                value={formData.birthDay}
                onChange={(e) => handleChange("birthDay", e.target.value)}
              >
                <option value="">일</option>
                {days.map((day) => (
                  <option key={day} value={day.toString()}>
                    {day}
                  </option>
                ))}
              </S.Select>
            </S.SelectGrid>

            <S.SectionTitle>
              회사 명 <span>*</span>
            </S.SectionTitle>
            <StartHubTextField
              type="text"
              value={formData.companyName}
              placeholder="회사명을 입력해주세요"
              onChange={(e) => handleChange("companyName", e.target.value)}
              customStyle={{ height: 50, width: "100%" }}
            />

            <S.SectionTitle>기업 설명</S.SectionTitle>
            <StartHubTextField
              type="text"
              value={formData.companyDescription}
              placeholder="기업 설명을 입력해주세요"
              onChange={(e) =>
                handleChange("companyDescription", e.target.value)
              }
              customStyle={{ height: 50, width: "100%" }}
            />

            <S.SectionTitle>창업 위치</S.SectionTitle>
            <StartHubTextField
              type="text"
              value={formData.startupLocation}
              placeholder="창업 위치를 입력해주세요"
              onChange={(e) => handleChange("startupLocation", e.target.value)}
              customStyle={{ height: 50, width: "100%" }}
            />

            <S.SectionTitle>연매출액</S.SectionTitle>
            <StartHubTextField
              type="text"
              value={formData.annualRevenue}
              placeholder="연매출액을 입력해주세요"
              onChange={(e) => handleChange("annualRevenue", e.target.value)}
              customStyle={{ height: 50, width: "100%" }}
            />

            <S.SectionTitle>기업 인원</S.SectionTitle>
            <StartHubTextField
              type="text"
              value={formData.numberOfEmployees}
              placeholder="기업 인원을 입력해주세요"
              onChange={(e) =>
                handleChange("numberOfEmployees", e.target.value)
              }
              customStyle={{ height: 50, width: "100%" }}
            />

            <S.SectionTitle>기업 사이트</S.SectionTitle>
            <StartHubTextField
              type="text"
              value={formData.companyWebsite}
              placeholder="기업 사이트를 입력해주세요"
              onChange={(e) => handleChange("companyWebsite", e.target.value)}
              customStyle={{ height: 50, width: "100%" }}
            />
        </S.InfoTable>

        <StartHubButton
          text={isPending ? "저장 중..." : "완료"}
          width={77}
          height={36}
          typography={StartHubFont.Pretendard.Caption2.Medium}
          backgroundColor={StartHubColors.Primary}
          textTheme={StartHubColors.White1}
          customStyle={{ borderRadius: "6px", float: "right", marginBottom: "300px"}}
          onClick={handleComplete}
          disabled={isPending}
        />
      </S.MainContent>
    </S.Wrapper>
  );
};

export default EditProfileForm;
