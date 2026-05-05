"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "@/entities/user/queryKey";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

const MyPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);

  const isProfileActive =
    pathname === "/my-profile" || pathname === "/my-profile-edit";
  const isLikeActive = pathname === "/like-list";

  const tryLogout = async () => {
    try {
      await StartHubAxios.post("/user/sign-out");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      setIsLoggedIn(false);
      queryClient.removeQueries({
        queryKey: USER_QUERY_KEYS.user.getUserProfile,
      });
      toast.success("로그아웃에 성공했습니다");
      router.push("/");
    } catch (error) {
      toast.error("로그아웃에 실패했습니다");
    }
  };

  const choiceLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) tryLogout();
  };

  const TERMS_URL =
    "https://various-bougon-d76.notion.site/27f507c40eaf80acbf4afba41b9964b7";
  const PRIVACY_URL =
    "https://various-bougon-d76.notion.site/27f507c40eaf80bbb86dfc3db0b06e04";

  const itemBase =
    "bg-transparent border-none text-left m-0 font-pt-body2-regular cursor-pointer font-normal w-full box-border";

  return (
    <>
      {/* 모바일: 탭 형태 */}
      <div className="lg:hidden w-full bg-hub-white-1 border-b border-hub-gray-3 fixed top-[90px] sm:top-[95px] md:top-[100px] z-30">
        <div className="flex justify-center py-2">
          <div className="flex bg-hub-gray-4 rounded-lg p-1">
            <button
              onClick={() => router.push("/my-profile")}
              className={`px-4 py-2 rounded-md font-pt-caption1-medium text-sm transition-all ${
                isProfileActive
                  ? "bg-hub-white-1 text-hub-black-1 shadow-sm"
                  : "text-hub-gray-2 hover:text-hub-black-1"
              }`}
            >
              프로필
            </button>
            <button
              onClick={() => router.push("/like-list")}
              className={`px-4 py-2 rounded-md font-pt-caption1-medium text-sm transition-all ${
                isLikeActive
                  ? "bg-hub-white-1 text-hub-black-1 shadow-sm"
                  : "text-hub-gray-2 hover:text-hub-black-1"
              }`}
            >
              좋아요
            </button>
          </div>
        </div>
      </div>

      {/* 데스크톱: 사이드바 형태 */}
      <aside className="hidden lg:block lg:fixed lg:left-[calc((100vw-1280px)/2+120px)] lg:top-[158px] lg:w-[224px] bg-hub-white-1 lg:h-auto lg:z-10">
        <button
          onClick={() => router.push("/my-profile")}
          className={`block w-full text-left py-2 text-lg hover:cursor-pointer ${isProfileActive ? "text-hub-black-1 font-medium" : "text-hub-gray-2"}`}
        >
          프로필
        </button>

        <button
          onClick={() => router.push("/like-list")}
          className={`block w-full text-left py-2 text-lg hover:cursor-pointer ${isLikeActive ? "text-hub-black-1 font-medium" : "text-hub-gray-2"}`}
        >
          좋아요
        </button>

        <button
          onClick={() => window.open(TERMS_URL, "_blank")}
          className="block w-full text-left py-2 text-lg text-hub-gray-2 hover:cursor-pointer"
        >
          서비스 이용 약관
        </button>

        <button
          onClick={() => window.open(PRIVACY_URL, "_blank")}
          className="block w-full text-left py-2 text-lg text-hub-gray-2 hover:cursor-pointer"
        >
          개인정보처리방침
        </button>

        <hr className="border-t border-hub-gray-3 w-full my-3" />

        <button
          onClick={choiceLogout}
          className="block w-full text-left py-2 text-lg text-hub-error font-medium hover:cursor-pointer"
        >
          로그아웃
        </button>
      </aside>
    </>
  );
};

export default MyPage;
