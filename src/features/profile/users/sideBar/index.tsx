import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isProfileActive = location.pathname === "/my-profile" || location.pathname === "/my-profile-edit";
  const isLikeActive = location.pathname === "/like-list";

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

      <S.Divider />

      <S.LogOut>
        로그아웃
      </S.LogOut>
    </S.Sidebar>
  );
};

export default MyPage;
