// MyPage.tsx
import React, { useState } from "react";
import { useAuth } from "@/shared/hooks/LogOut/useLogOut"; // 경로 확인
import * as S from "./style";

const MyPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<"프로필" | "좋아요">("프로필");
  const { isLoggingOut, logout } = useAuth();

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

      <S.LogOut
        onClick={logout}
        disabled={isLoggingOut}
      >
        로그아웃
      </S.LogOut>
    </S.Sidebar>
  );
};

export default MyPage;
