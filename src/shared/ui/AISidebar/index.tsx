"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as S from "./style";
import { ReactComponent as IconAI } from "@/assets/logo/Icon-AI.svg";
import { ReactComponent as SquareAndPencilIcon } from "@/assets/icons/square.and.pencil.svg";
import { ReactComponent as NewspaperIcon } from "@/assets/icons/newspaper.svg";
import { ReactComponent as ChartBarIcon } from "@/assets/icons/chart.bar.svg";
import { ReactComponent as BriefcaseIcon } from "@/assets/icons/briefcase.svg";
import { ReactComponent as ProfileAIIcon } from "@/assets/icons/profile-ai.svg";
import { useGetSessions } from "@/features/chatAI/hooks/useGetSessions";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";
import { useDeleteSession } from "@/features/chatAI/hooks/useDeleteSession";
import { useUpdateSessionTitle } from "@/features/chatAI/hooks/useUpdateSessionTitle";
import { ReactComponent as SidebarIcon } from "@assets/icons/ai-sidebar.svg";

interface AISidebarProps {
  activeMenu?: string;
  onChatClick?: (id: number) => void;
  onNewChat?: () => void;
  defaultExpanded?: boolean;
  creatingSession?: boolean;
}

const AISidebar = ({
  activeMenu,
  onChatClick,
  onNewChat,
  defaultExpanded,
  creatingSession,
}: AISidebarProps) => {
  const { data: chatSessions = [] } = useGetSessions();
  const { data: profile } = useGetMyProfile();
  const { mutate: deleteSession } = useDeleteSession();
  const { mutate: updateTitle } = useUpdateSessionTitle();
  const [expanded, setExpanded] = useState<boolean>(!!defaultExpanded);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };
    if (menuOpenId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpenId]);

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const handleRename = (sessionId: number, currentTitle: string) => {
    setMenuOpenId(null);
    setEditingId(sessionId);
    setEditValue(currentTitle);
  };

  const handleRenameSubmit = (sessionId: number) => {
    const trimmed = editValue.trim();
    if (trimmed) {
      updateTitle({ sessionId, title: trimmed });
    }
    setEditingId(null);
  };

  const handleDelete = (sessionId: number) => {
    setMenuOpenId(null);
    deleteSession(sessionId);
  };

  const handleNewChat = () => {
    onNewChat?.();
  };

  return (
    <S.SidebarContainer $expanded={expanded}>
      <S.LogoWrapper $expanded={expanded}>
        <S.LogoButton
          $expanded={expanded}
          onClick={() => expanded && router.push("/")}
        >
          <IconAI width={32} height={32} />
        </S.LogoButton>
        <S.LogoContent $expanded={expanded}>
          <S.LogoTitle>StartHub AI</S.LogoTitle>
        </S.LogoContent>
        <S.ToggleButton
          $expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          title={expanded ? "사이드바 닫기" : "사이드바 열기"}
        >
          <SidebarIcon width={expanded ? 20 : 24} height={expanded ? 20 : 24} />
        </S.ToggleButton>
      </S.LogoWrapper>

      {expanded && <S.SectionLabel>StartHub</S.SectionLabel>}

      <S.NavSection $expanded={expanded}>
        <S.NavButton
          $active={activeMenu === "edit"}
          $expanded={expanded}
          onClick={() => {
            if (!creatingSession) handleNewChat();
          }}
        >
          <SquareAndPencilIcon width={18} height={18} />
          {expanded && "새 채팅"}
        </S.NavButton>

        <S.NavButton
          $active={activeMenu === "news"}
          $expanded={expanded}
          onClick={() => router.push("/notices")}
        >
          <NewspaperIcon width={18} height={18} />
          {expanded && "공고 보러가기"}
        </S.NavButton>

        <S.NavButton
          $active={activeMenu === "chart"}
          $expanded={expanded}
          onClick={() => router.push("/competitor")}
        >
          <ChartBarIcon width={18} height={18} />
          {expanded && "경쟁사 분석"}
        </S.NavButton>

        <S.NavButton
          $active={activeMenu === "briefcase"}
          $expanded={expanded}
          onClick={() => router.push("/bmc")}
        >
          <BriefcaseIcon width={18} height={18} />
          {expanded && "BMC 설계"}
        </S.NavButton>
      </S.NavSection>

      {expanded && (
        <>
          <S.Divider />
          <S.SectionLabel>내 채팅</S.SectionLabel>
          <S.ChatList>
            {chatSessions.map((session) => (
              <S.ChatItemWrapper key={session.id}>
                {editingId === session.id ? (
                  <S.ChatEditInput
                    ref={editInputRef}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleRenameSubmit(session.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameSubmit(session.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                  />
                ) : (
                  <S.ChatItem onClick={() => onChatClick?.(session.id)}>
                    <S.ChatItemTitle>{session.title}</S.ChatItemTitle>
                    <S.MoreButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(
                          menuOpenId === session.id ? null : session.id,
                        );
                      }}
                    >
                      ···
                    </S.MoreButton>
                  </S.ChatItem>
                )}

                {menuOpenId === session.id && (
                  <S.ContextMenu ref={menuRef}>
                    <S.ContextMenuItem
                      onClick={() => handleRename(session.id, session.title)}
                    >
                      이름 바꾸기
                    </S.ContextMenuItem>
                    <S.ContextMenuItem
                      $danger
                      onClick={() => handleDelete(session.id)}
                    >
                      삭제
                    </S.ContextMenuItem>
                  </S.ContextMenu>
                )}
              </S.ChatItemWrapper>
            ))}
          </S.ChatList>
        </>
      )}

      <S.BottomSection $expanded={expanded}>
        <S.ProfileButton>
          <ProfileAIIcon width={32} height={32} />
        </S.ProfileButton>
        {expanded && (
          <S.ProfileInfo>
            <S.ProfileName>{profile?.username ?? "사용자"}</S.ProfileName>
            <S.ProfileEmail>{profile?.email ?? ""}</S.ProfileEmail>
          </S.ProfileInfo>
        )}
      </S.BottomSection>
    </S.SidebarContainer>
  );
};

export default AISidebar;
