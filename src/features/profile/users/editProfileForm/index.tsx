"use client";
import React, { useState, useEffect, useMemo } from "react";
import { StartHubButton, StartHubTextField } from "@/shared/ui";
import SideBar from "@/features/profile/users/sideBar";
import { useRouter } from "next/navigation";
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

const selectClass = `
  w-full h-[50px] px-[15px] border border-hub-gray-3 rounded-[10px]
  font-pt-caption1-regular bg-hub-white-1 mb-5 text-hub-black-1
  focus:outline-none focus:border-hub-primary
  invalid:text-[#999]
  [&>option]:text-hub-black-1 [&>option[value='']]:text-[#999]
`;

const EditProfileForm: React.FC = () => {
  const router = useRouter();
  const { data: profileData, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState<ProfileFormData>(INITIAL_FORM_DATA);

  useEffect(() => {
    if (profileData) {
      setFormData(formatProfileToForm(profileData));
    }
  }, [profileData]);

  const years = useMemo(() => generateYears(), []);
  const months = useMemo(() => generateMonths(), []);
  const days = useMemo(() => generateDays(), []);

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    if (!validateRequiredFields(formData)) return;
    const profileUpdateData = formatFormToProfile(formData);
    updateProfile(profileUpdateData, {
      onSuccess: () => router.push("/my-profile"),
    });
  };

  if (isLoading) {
    return (
      // Wrapper
      <div className="flex w-full box-border px-[160px] pl-[200px]">
        <SideBar />
        {/* MainContent */}
        <section className="flex-1 px-10">
          <div className="text-center mt-[100px] text-base">
            프로필 정보를 불러오는 중...
          </div>
        </section>
      </div>
    );
  }

  return (
    // Wrapper
    <div className="flex w-full box-border pr-[160px] pl-[200px]">
      <SideBar />

      {/* MainContent */}
      <section className="flex-1 px-10">
        {/* HeaderSection */}
        <div className="mb-[30px] mt-[50px]">
          <p className="font-pt-h2-semibold text-hub-black-1 mb-2">
            "어제의 꿈은 오늘의 희망이며 내일의 현실이다."
          </p>
          <h2 className="font-pt-title2 text-hub-black-1">
            오늘도 잘 부탁드립니다
          </h2>
        </div>

        {/* InfoTable */}
        <div className="w-full mb-[30px] flex flex-col gap-0">
          <h3 className="font-pt-body2-medium text-hub-black-1 mb-2.5">
            이름 <span className="text-hub-primary text-sm">*</span>
          </h3>
          <StartHubTextField
            type="text"
            value={formData.username}
            placeholder="이름을 입력해주세요"
            onChange={(e) => handleChange("username", e.target.value)}
            className="height-50px w-100%"
          />

          <h3 className="font-pt-body2-medium text-hub-black-1 mb-2.5">
            성별 <span className="text-hub-primary text-sm">*</span>
          </h3>
          <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            required
            className={selectClass}
          >
            <option value="">성별을 선택해주세요</option>
            <option value="MALE">남</option>
            <option value="FEMALE">여</option>
          </select>

          <h3 className="font-pt-body2-medium text-hub-black-1 mb-2.5">
            생년월일 <span className="text-hub-primary text-sm">*</span>
          </h3>
          {/* SelectGrid */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <select
              value={formData.birthYear}
              onChange={(e) => handleChange("birthYear", e.target.value)}
              className={selectClass}
            >
              <option value="">년</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={formData.birthMonth}
              onChange={(e) => handleChange("birthMonth", e.target.value)}
              className={selectClass}
            >
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month.toString()}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={formData.birthDay}
              onChange={(e) => handleChange("birthDay", e.target.value)}
              className={selectClass}
            >
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day.toString()}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <h3 className="font-pt-body2-medium text-hub-black-1 mb-2.5">
            회사 명 <span className="text-hub-primary text-sm">*</span>
          </h3>
          <StartHubTextField
            type="text"
            value={formData.companyName}
            placeholder="회사명을 입력해주세요"
            onChange={(e) => handleChange("companyName", e.target.value)}
            className="height-50px w-100%"
          />

          <h3 className="font-pt-body2-medium text-hub-black-1 mb-2.5">
            기업 설명
          </h3>
          <StartHubTextField
            type="text"
            value={formData.companyDescription}
            placeholder="기업 설명을 입력해주세요"
            onChange={(e) => handleChange("companyDescription", e.target.value)}
            className="height-50px w-100%"
          />

          <h3 className="font-pt-body2-medium text-hub-black-1 mb-2.5">
            창업 위치
          </h3>
          <StartHubTextField
            type="text"
            value={formData.startupLocation}
            placeholder="창업 위치를 입력해주세요"
            onChange={(e) => handleChange("startupLocation", e.target.value)}
            className="height-50px w-100%"
          />

          <h3 className="font-pt-body2-medium text-hub-black-1 mb-2.5">
            연매출액
          </h3>
          <StartHubTextField
            type="text"
            value={formData.annualRevenue}
            placeholder="연매출액을 입력해주세요"
            onChange={(e) => handleChange("annualRevenue", e.target.value)}
            className="height-50px w-100%"
          />

          <h3 className="font-pt-body2-medium text-hub-black-1 mb-2.5">
            기업 인원
          </h3>
          <StartHubTextField
            type="text"
            value={formData.numberOfEmployees}
            placeholder="기업 인원을 입력해주세요"
            onChange={(e) => handleChange("numberOfEmployees", e.target.value)}
            className="height-50px w-100%"
          />

          <h3 className="font-pt-body2-medium text-hub-black-1 mb-2.5">
            기업 사이트
          </h3>
          <StartHubTextField
            type="text"
            value={formData.companyWebsite}
            placeholder="기업 사이트를 입력해주세요"
            onChange={(e) => handleChange("companyWebsite", e.target.value)}
            className="height-50px w-100%"
          />
        </div>

        <StartHubButton
          text={isPending ? "저장 중..." : "완료"}
          width={77}
          height={36}
          className="font-pt-caption2-medium rounded-[6px] float-right mb-[300px]"
          backgroundColor="#2466F4"
          textTheme="#FFFFFF"
          onClick={handleComplete}
          disabled={isPending}
        />
      </section>
    </div>
  );
};

export default EditProfileForm;
