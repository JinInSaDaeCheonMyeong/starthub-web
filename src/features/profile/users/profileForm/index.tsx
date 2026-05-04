"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { StartHubButton } from "@/shared/ui";
import SideBar from "@/features/profile/users/sideBar";
import { useProfile } from "@/shared/hooks/Profile";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import NotMyPage from "./ui/NotMyPage";
import {
  formatGender,
  formatCurrency,
  formatEmployees,
  safeValue,
} from "../utils/profileDisplayHelpers";

const ProfileForm: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { data: profileData, isLoading, isError } = useProfile();

  useEffect(() => {
    if (isError && isLoggedIn) {
      toast.error("프로필 로딩 실패");
    }
  }, [isError, isLoggedIn]);

  const handleEditClick = () => router.push("/my-profile-edit");

  const profileTableData = useMemo(() => {
    if (!profileData) return [];
    return [
      { label: "이메일", value: safeValue(profileData.email) },
      { label: "성별", value: formatGender(profileData.gender) },
      { label: "생년월일", value: safeValue(profileData.birth) },
      { label: "회사명", value: safeValue(profileData.companyName) },
      { label: "기업 설명", value: safeValue(profileData.companyDescription) },
      { label: "창업 위치", value: safeValue(profileData.startupLocation) },
      { label: "연매출액", value: formatCurrency(profileData.annualRevenue) },
      {
        label: "기업 인원",
        value: formatEmployees(profileData.numberOfEmployees),
      },
      { label: "기업 사이트", value: safeValue(profileData.companyWebsite) },
    ];
  }, [profileData]);

  if (isLoading && isLoggedIn) {
    return (
      // Wrapper
      <div className="flex w-full box-border px-[200px] h-full">
        <SideBar />
        <section className="flex-1 px-10">
          <div className="text-center mt-[100px] text-base">로딩 중...</div>
        </section>
      </div>
    );
  }

  return (
    // Wrapper
    <div className="flex w-full box-border px-[200px] h-full">
      <SideBar />

      {isLoggedIn ? (
        // MainContent
        <section className="flex-1 px-10">
          {/* HeaderSection */}
          <div className="mb-[30px] mt-[50px]">
            <p className="font-pt-h2-semibold text-hub-black-1 mb-2">
              "어제의 꿈은 오늘의 희망이며 내일의 현실이다."
            </p>
            <h2 className="font-pt-title2 text-hub-black-1">
              오늘도 잘 부탁드립니다,{" "}
              <span className="text-hub-primary">{profileData?.username}</span>
              님!
            </h2>
          </div>

          {/* InfoTable */}
          <table className="w-full border-collapse mb-[30px]">
            <tbody>
              {profileTableData.map(({ label, value }) => (
                <tr key={label} className="border-b border-hub-gray-3">
                  <th className="text-left p-5 w-[150px] font-pt-body2-medium text-hub-black-1">
                    {label}
                  </th>
                  <td className="p-3 text-hub-gray-1 font-pt-body2-regular text-right">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <StartHubButton
            text="수정"
            width={77}
            height={36}
            className="font-pt-caption2-medium rounded-[6px] float-right mb-[100px]"
            backgroundColor="#2466F4"
            textTheme="#FFFFFF"
            onClick={handleEditClick}
          />
        </section>
      ) : (
        <NotMyPage />
      )}
    </div>
  );
};

export default ProfileForm;
