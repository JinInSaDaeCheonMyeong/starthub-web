"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StartHubButton } from "@/shared/ui";
import SideBar from "@/features/profile/users/sideBar";
import { useProfile } from "@/shared/hooks/Profile";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import NotMyPage from "./ui/NotMyPage";

const ProfileForm: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const { data: profileData, isLoading, isError } = useProfile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isError && isLoggedIn && !isLoading) {
      toast.error("프로필 로딩 실패");
    }
  }, [isError, isLoggedIn, isLoading]);

  const handleEditClick = () => router.push("/my-profile-edit");

  const profileTableData = useMemo(() => {
    if (!profileData) return [];
    return [
      { label: "이메일", value: profileData.email || "-" },
      { label: "성별", value: profileData.gender === "MALE" ? "남성" : profileData.gender === "FEMALE" ? "여성" : "-" },
      { label: "생년월일", value: profileData.birth || "-" },
      { label: "회사명", value: profileData.companyName || "-" },
      { label: "기업 설명", value: profileData.companyDescription || "-" },
      { label: "창업 위치", value: profileData.startupLocation || "-" },
      { label: "연매출액", value: profileData.annualRevenue || "-" },
      { label: "기업 인원", value: profileData.numberOfEmployees || "-" },
      { label: "기업 사이트", value: profileData.companyWebsite || "-" },
    ];
  }, [profileData]);

  if (!mounted || isLoading) {
    return (
      <div className="w-full min-h-screen bg-white">
        <SideBar />
        <div className="pt-[150px] sm:pt-[150px] md:pt-[160px] lg:pt-0">
          <div className="w-full max-w-[1280px] mx-auto">
            <div className="px-4 lg:pl-[384px] lg:pr-[120px] lg:pt-[158px] pb-[50px]">
              <div className="text-center text-base">로딩 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <SideBar />

      <div className="pt-[150px] sm:pt-[150px] md:pt-[160px] lg:pt-0">
        {isLoggedIn ? (
          <div className="w-full max-w-[1280px] mx-auto">
            {/* 메인 컨텐츠 영역 */}
            <div className="px-4 lg:pl-[384px] lg:pr-[120px] lg:pt-[158px] pb-[50px]">
            {/* HeaderSection */}
            <div className="mb-[50px]">
              <p className="font-pt-h1-semibold text-hub-black-1 mb-[9px] text-lg lg:text-2xl">
                "어제의 꿈은 오늘의 희망이며 내일의 현실이다."
              </p>
              <h2 className="font-pt-title2 text-hub-black-1 text-2xl lg:text-[40px] leading-tight">
                오늘도 잘 부탁드립니다,{" "}
                <span className="text-hub-primary">{profileData?.username}</span>
                님!
              </h2>
            </div>

            {/* 프로필 테이블 */}
            <div className="space-y-0">
              {profileTableData.map(({ label, value }) => (
                <div key={label}>
                  <div className="flex justify-between items-center py-5">
                    <span className="font-pt-body2-medium text-hub-black-1 text-base">
                      {label}
                    </span>
                    <span className="font-pt-body2-regular text-hub-gray-1 text-base">
                      {value}
                    </span>
                  </div>
                  <div className="border-b border-hub-gray-3" />
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-[60px]">
              <StartHubButton
                text="수정"
                width={77}
                height={36}
                className="font-pt-caption2-medium rounded-[6px]"
                backgroundColor="#2466F4"
                textTheme="#FFFFFF"
                onClick={handleEditClick}
              />
            </div>

            {/* 모바일: 추가 메뉴 */}
            <div className="lg:hidden border-t border-hub-gray-3 pt-6 space-y-4">
              <button
                onClick={() => window.open("https://various-bougon-d76.notion.site/27f507c40eaf80acbf4afba41b9964b7", "_blank")}
                className="w-full text-left font-pt-body2-regular text-hub-gray-2 py-2"
              >
                서비스 이용 약관
              </button>
              <button
                onClick={() => window.open("https://various-bougon-d76.notion.site/27f507c40eaf80bbb86dfc3db0b06e04", "_blank")}
                className="w-full text-left font-pt-body2-regular text-hub-gray-2 py-2"
              >
                개인정보처리방침
              </button>
              <hr className="border-t border-hub-gray-3" />
              <button
                onClick={async () => {
                  if (confirm("로그아웃 하시겠습니까?")) {
                    const { default: StartHubAxios } = await import("@/shared/api/customAxios/StartHubAxios");
                    const { default: Cookies } = await import("js-cookie");
                    const { toast } = await import("react-toastify");
                    try {
                      await StartHubAxios.post("/user/sign-out");
                      Cookies.remove("access_token");
                      Cookies.remove("refresh_token");
                      toast.success("로그아웃에 성공했습니다");
                      router.push("/");
                    } catch (error) {
                      toast.error("로그아웃에 실패했습니다");
                    }
                  }
                }}
                className="w-full text-left font-pt-body2-regular text-hub-error py-2"
              >
                로그아웃
              </button>
            </div>
            </div>
          </div>
        ) : (
          <NotMyPage />
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
