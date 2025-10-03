import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style";
import { toast } from "react-toastify";
import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import Cookies from "js-cookie";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isProfileActive =
    location.pathname === "/my-profile" ||
    location.pathname === "/my-profile-edit";
  const isLikeActive = location.pathname === "/like-list";

  const tryLogout = async () => {
    try {
      await StartHubAxios.post("/user/sign-out");
      Cookies.remove("access_token");
      toast.success("로그아웃에 성공했습니다");
      window.location.reload();
    } catch (error) {
      toast.error("로그아웃에 실패했습니다");
    }
  };

  const choiceLogout = () =>{
    const choice = confirm('로그아웃 하시겠습니까?')
    if(choice){
      tryLogout()
    }
  }
  const TERMS_URL = "https://various-bougon-d76.notion.site/27f507c40eaf80acbf4afba41b9964b7";
  const PRIVACY_URL = "https://various-bougon-d76.notion.site/27f507c40eaf80bbb86dfc3db0b06e04";

  return (
    <S.Sidebar>
      <S.SidebarItem
        className={isProfileActive ? "active" : ""}
        onClick={() => {
          navigate("/my-profile");
        }}
      >
        프로필
      </S.SidebarItem>

      <S.SidebarItem
        className={isLikeActive ? "active" : ""}
        onClick={() => {
          navigate("/like-list");
        }}
      >
        좋아요
      </S.SidebarItem>

      <S.SidebarItem onClick={() => window.open(TERMS_URL, "_blank")}>
        서비스 이용 약관
      </S.SidebarItem>

      <S.SidebarItem onClick={() => window.open(PRIVACY_URL, "_blank")}>
        개인정보처리방침
      </S.SidebarItem>
      <S.Divider />

      <S.LogOut onClick={() => choiceLogout()}>로그아웃</S.LogOut>
    </S.Sidebar>
  );
};

export default MyPage;
