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
    // Sidebar
    <aside className="flex flex-col h-[calc(100vh-60px)] bg-hub-white-1 pt-[30px]">
      <button
        onClick={() => router.push("/my-profile")}
        className={`${itemBase} pb-5 ${isProfileActive ? "text-hub-black-1" : "text-hub-gray-2"}`}
      >
        프로필
      </button>

      <button
        onClick={() => router.push("/like-list")}
        className={`${itemBase} pb-5 ${isLikeActive ? "text-hub-black-1" : "text-hub-gray-2"}`}
      >
        좋아요
      </button>

      <button
        onClick={() => window.open(TERMS_URL, "_blank")}
        className={`${itemBase} pb-5 text-hub-gray-2`}
      >
        서비스 이용 약관
      </button>

      <button
        onClick={() => window.open(PRIVACY_URL, "_blank")}
        className={`${itemBase} pb-5 text-hub-gray-2`}
      >
        개인정보처리방침
      </button>

      {/* Divider */}
      <hr className="border-t border-hub-gray-3 w-[224px]" />

      {/* LogOut */}
      <button
        onClick={choiceLogout}
        className="bg-transparent border-none text-left m-0 pt-5 font-pt-body2-regular cursor-pointer font-normal box-border text-hub-error"
      >
        로그아웃
      </button>
    </aside>
  );
};

export default MyPage;
