import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const MyPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<"프로필" | "좋아요">("프로필");
  const navigate = useNavigate();

  return (
    <S.Sidebar>
      <S.SidebarItem
        className={activeMenu === "프로필" ? "active" : ""}
        onClick={() => {
          setActiveMenu("프로필");
          navigate("/my-profile");
        }}
      >
        프로필
      </S.SidebarItem>

      <S.SidebarItem
        className={activeMenu === "좋아요" ? "active" : ""}
        onClick={() => {
          setActiveMenu("좋아요");
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
