import React, { useState } from "react";
import * as S from "./style";

const MyPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<"프로필" | "좋아요">("프로필");

  return (
    <S.Sidebar>
      <S.SidebarItem
        className={activeMenu === "프로필" ? "active" : ""}
        onClick={() => setActiveMenu("프로필")}
      >
        프로필
      </S.SidebarItem>

      <S.SidebarItem
        className={activeMenu === "좋아요" ? "active" : ""}
        onClick={() => setActiveMenu("좋아요")}
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
