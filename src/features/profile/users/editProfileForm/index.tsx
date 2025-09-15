import React, { useState, useEffect } from "react";
import * as S from "./style";
import { StartHubButton, StartHubTextField } from "@/shared/ui";
import { StartHubFont } from "@/shared/design/text/StartHubFont";
import { StartHubColors } from "@/shared/design";
import SideBar from "@/features/profile/users/sideBar";
import { useNavigate } from "react-router-dom";
import { ProfileData } from "@/shared/types/ProfileTypes";
import { profileApi } from "@/shared/api/profileApi";
import { toast } from "react-toastify";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    gender: "" as "MALE" | "FEMALE" | "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    companyName: "",
    companyDescription: "",
    startupLocation: "",
    annualRevenue: "",
    numberOfEmployees: "",
    companyWebsite: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const formatProfileToForm = (profile: ProfileData) => {
    const birthDate = new Date(profile.birth);
    return {
      username: profile.username,
      gender: profile.gender,
      birthYear: birthDate.getFullYear().toString(),
      birthMonth: (birthDate.getMonth() + 1).toString(),
      birthDay: birthDate.getDate().toString(),
      companyName: profile.companyName,
      companyDescription: profile.companyDescription,
      startupLocation: profile.startupLocation,
      annualRevenue: profile.annualRevenue.toString(),
      numberOfEmployees: profile.numberOfEmployees.toString(),
      companyWebsite: profile.companyWebsite,
    };
  };

  const fetchProfile = async () => {
    try {
      const profile = await profileApi.getUserProfile();
      setFormData(formatProfileToForm(profile));
    } catch {
      toast.error("프로필 로딩 실패")
    }
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - 1949 },
      (_, i) => currentYear - i
    );
  };

  const generateMonths = () => Array.from({ length: 12 }, (_, i) => i + 1);
  const generateDays = () => Array.from({ length: 31 }, (_, i) => i + 1);

  const years = generateYears();
  const months = generateMonths();
  const days = generateDays();

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateRequiredFields = (): boolean => {
    const requiredFields = {
      username: '이름',
      gender: '성별',
      birthYear: '생년월일',
      birthMonth: '생년월일',
      birthDay: '생년월일',
      companyName: '회사명'
    };

    const emptyFields: string[] = [];
    
    if (!formData.username.trim()) emptyFields.push(requiredFields.username);
    if (!formData.gender) emptyFields.push(requiredFields.gender);
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      emptyFields.push(requiredFields.birthYear);
    }
    if (!formData.companyName.trim()) emptyFields.push(requiredFields.companyName);

    if (emptyFields.length > 0) {
      alert("필수 항목을 입력해주세요");
      return false;
    }
    
    return true;
  };

  const formatFormToProfile = (): Partial<ProfileData> => {
    const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(
      2,
      "0"
    )}-${formData.birthDay.padStart(2, "0")}`;

    return {
      username: formData.username,
      gender: formData.gender as "MALE" | "FEMALE",
      birth: birthDate,
      companyName: formData.companyName,
      companyDescription: formData.companyDescription,
      startupLocation: formData.startupLocation,
      annualRevenue: parseInt(formData.annualRevenue) || 0,
      numberOfEmployees: parseInt(formData.numberOfEmployees) || 0,
      companyWebsite: formData.companyWebsite,
    };
  };

  const handleComplete = async () => {
    if (!validateRequiredFields()) {
      return;
    }

    try {
      const profileData = formatFormToProfile();
      await profileApi.updateProfile(profileData);
      navigate("/my-profile");
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
          text="완료"
          width={77}
          height={36}
          typography={StartHubFont.Pretendard.Caption2.Medium}
          backgroundColor={StartHubColors.Primary}
          textTheme={StartHubColors.White1}
          customStyle={{ borderRadius: "6px", float: "right", marginBottom: "300px"}}
          onClick={handleComplete}
        />
      </S.MainContent>
    </S.Wrapper>
  );
};

export default MyPage;
