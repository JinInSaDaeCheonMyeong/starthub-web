"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReactComponent as IconAI } from "@/assets/logo/Icon-AI.svg";
import { ReactComponent as SquareAndPencilIcon } from "@/assets/icons/square.and.pencil.svg";
import { ReactComponent as NewspaperIcon } from "@/assets/icons/newspaper.svg";
import { ReactComponent as ChartBarIcon } from "@/assets/icons/chart.bar.svg";
import { ReactComponent as BriefcaseIcon } from "@/assets/icons/briefcase.svg";
import { ReactComponent as ProfileAIIcon } from "@/assets/icons/profile-ai.svg";
import { ReactComponent as SidebarIcon } from "@assets/icons/ai-sidebar.svg";
import { useGetSessions } from "@/features/chatAI/hooks/useGetSessions";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";
import { useDeleteSession } from "@/features/chatAI/hooks/useDeleteSession";
import { useUpdateSessionTitle } from "@/features/chatAI/hooks/useUpdateSessionTitle";

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 모바일에서 expanded 상태 관리
  useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    } else {
      setExpanded(!!defaultExpanded);
    }
  }, [isMobile, defaultExpanded]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };
    if (menuOpenId !== null)
      document.addEventListener("mousedown", handleClickOutside);
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
    if (trimmed) updateTitle({ sessionId, title: trimmed });
    setEditingId(null);
  };

  const handleDelete = (sessionId: number) => {
    setMenuOpenId(null);
    deleteSession(sessionId);
  };

  const navItems = [
    {
      key: "edit",
      icon: <SquareAndPencilIcon width={18} height={18} />,
      label: "새 채팅",
      onClick: () => {
        if (!creatingSession) onNewChat?.();
      },
    },
    {
      key: "news",
      icon: <NewspaperIcon width={18} height={18} />,
      label: "공고 보러가기",
      onClick: () => router.push("/notices"),
    },
    {
      key: "chart",
      icon: <ChartBarIcon width={18} height={18} />,
      label: "경쟁사 분석",
      onClick: () => router.push("/competitor"),
    },
    {
      key: "briefcase",
      icon: <BriefcaseIcon width={18} height={18} />,
      label: "BMC 설계",
      onClick: () => router.push("/bmc"),
    },
  ];

  return (
    <>
      {/* 모바일 오버레이 배경 */}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setExpanded(false)}
        />
      )}

      <nav
        className={`flex flex-col bg-[#fafafa] border-r border-[#e5e5e5] h-full overflow-y-auto overflow-x-hidden transition-all duration-200 ease-in-out ${
          isMobile
            ? expanded
              ? "w-[280px] fixed left-0 top-0 z-50"
              : "w-12 relative"
            : expanded
              ? "w-[260px]"
              : "w-12"
        }`}
      >
      {/* 로고 영역 */}
      <div
        className={`flex items-center gap-2 p-2 relative transition-all duration-200 overflow-visible ${
          expanded ? "justify-between mb-3" : "justify-center mb-[26px] group"
        }`}
      >
        {/* 로고 버튼 */}
        <div
          onClick={() => {
            if (isMobile && !expanded) {
              setExpanded(true);
            } else if (expanded) {
              router.push("/");
            }
          }}
          className={`flex justify-center items-center w-8 h-8 rounded-[10px] bg-hub-primary shrink-0 transition-all duration-200 ${
            expanded
              ? "cursor-pointer hover:opacity-90"
              : isMobile
                ? "cursor-pointer hover:opacity-90"
                : "cursor-default group-hover:opacity-0 group-hover:invisible"
          }`}
        >
          <IconAI width={32} height={32} />
        </div>

        {/* 로고 타이틀 */}
        {expanded && (
          <div className="flex items-center gap-2 flex-1">
            <span className="font-pt-body2-medium text-hub-black-1 whitespace-nowrap">
              StartHub AI
            </span>
          </div>
        )}

        {/* 토글 버튼 - 모바일에서 닫혀있을 때는 숨김 */}
        {!(isMobile && !expanded) && (
          <button
            onClick={() => setExpanded((v) => !v)}
            title={expanded ? "사이드바 닫기" : "사이드바 열기"}
            className={`flex justify-center items-center w-8 h-8 p-0 border-none rounded-lg bg-transparent cursor-pointer shrink-0 text-[#666] z-10 transition-all duration-200 hover:bg-[rgba(36,102,244,0.1)] hover:text-[#333] ${
              expanded
                ? "static opacity-100 visible"
                : "absolute left-2 top-2 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto"
            }`}
          >
            <SidebarIcon width={expanded ? 20 : 24} height={expanded ? 20 : 24} />
          </button>
        )}
      </div>

      {/* 섹션 레이블 */}
      {expanded && (
        <div className="px-4 py-1 font-pt-caption2-regular text-hub-gray-2 whitespace-nowrap">
          StartHub
        </div>
      )}

      {/* 네비게이션 */}
      <div
        className={`flex flex-col px-2 gap-2 ${
          expanded || !isMobile ? "items-stretch pt-0" : "items-center pt-[10px]"
        }`}
      >
        {navItems.map(({ key, icon, label, onClick }) => {
          const isActive = activeMenu === key;
          const showLabel = expanded || !isMobile;
          return (
            <button
              key={key}
              onClick={onClick}
              className={[
                "flex items-center h-8 border-none rounded-lg cursor-pointer text-[13px] font-medium transition-colors [&_svg]:shrink-0",
                showLabel
                  ? "justify-start gap-[10px] px-2 w-auto"
                  : "justify-center w-8 p-0",
                isActive && showLabel
                  ? "bg-[rgba(36,102,244,0.08)]"
                  : "bg-transparent",
                isActive ? "text-hub-primary" : "text-hub-black-1",
                showLabel
                  ? "hover:bg-[rgba(36,102,244,0.08)] hover:text-hub-primary"
                  : "hover:text-hub-primary",
              ].join(" ")}
            >
              {icon}
              {showLabel && (
                <span className="whitespace-nowrap overflow-hidden text-ellipsis block" style={{ maxWidth: '180px' }}>
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 채팅 목록 */}
      {expanded && (
        <>
          <hr className="border-none border-t border-[#e5e5e5] mx-3 my-2" />
          <div className="px-4 py-1 font-pt-caption2-regular text-hub-gray-2 whitespace-nowrap">
            내 채팅
          </div>
          <div className="flex flex-col px-3 overflow-y-auto flex-1">
            {chatSessions.map((session) => (
              <div key={session.id} className="relative">
                {editingId === session.id ? (
                  <input
                    ref={editInputRef}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleRenameSubmit(session.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameSubmit(session.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="w-full px-3 py-[7px] border border-hub-primary rounded-lg bg-hub-white-1 text-[13px] text-hub-black-1 outline-none"
                  />
                ) : (
                  <button
                    onClick={() => onChatClick?.(session.id)}
                    className="group/item flex items-center justify-between w-full px-2 py-[7px] border-none rounded-lg bg-transparent text-hub-black-1 text-[13px] font-normal cursor-pointer text-left hover:bg-[rgba(36,102,244,0.08)]"
                  >
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis block" style={{ maxWidth: 'calc(100% - 32px)' }}>
                      {session.title}
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(
                          menuOpenId === session.id ? null : session.id,
                        );
                      }}
                      className="shrink-0 w-6 h-6 flex items-center justify-center rounded text-[14px] font-bold tracking-[1px] text-hub-gray-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 hover:bg-[rgba(0,0,0,0.06)] hover:text-hub-black-1"
                    >
                      ···
                    </span>
                  </button>
                )}

                {/* 컨텍스트 메뉴 */}
                {menuOpenId === session.id && (
                  <div
                    ref={menuRef}
                    className="absolute top-full right-2 z-[100] min-w-[140px] py-[6px] bg-hub-white-1 border border-[#e5e5e5] rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                  >
                    <button
                      onClick={() => handleRename(session.id, session.title)}
                      className="flex items-center gap-2 w-full px-[14px] py-[10px] border-none bg-transparent text-[13px] font-medium text-hub-black-1 cursor-pointer whitespace-nowrap hover:bg-[rgba(36,102,244,0.06)]"
                    >
                      이름 바꾸기
                    </button>
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="flex items-center gap-2 w-full px-[14px] py-[10px] border-none bg-transparent text-[13px] font-medium text-[#e53e3e] cursor-pointer whitespace-nowrap hover:bg-[rgba(229,62,62,0.06)]"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* 하단 프로필 */}
      <div
        className={`flex items-center gap-[10px] mt-auto ${
          expanded ? "p-3 border-t border-[#e5e5e5]" : "p-2 justify-center"
        }`}
      >
        <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-[rgba(36,102,244,0.15)] overflow-hidden shrink-0">
          <ProfileAIIcon width={32} height={32} />
        </div>
        {expanded && (
          <div className="flex flex-col overflow-hidden">
            <span className="text-[13px] font-semibold text-hub-black-1 whitespace-nowrap overflow-hidden text-ellipsis">
              {profile?.username ?? "사용자"}
            </span>
            <span className="text-[11px] text-hub-gray-2 whitespace-nowrap overflow-hidden text-ellipsis">
              {profile?.email ?? ""}
            </span>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default AISidebar;
