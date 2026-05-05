"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReactComponent as IconAI } from "@/assets/logo/Icon-AI.svg";
import { ReactComponent as SquareAndPencilIcon } from "@/assets/icons/square.and.pencil.svg";
import { ReactComponent as NewspaperIcon } from "@/assets/icons/newspaper.svg";
import { ReactComponent as ChartBarIcon } from "@/assets/icons/chart.bar.svg";
import { ReactComponent as BriefcaseIcon } from "@/assets/icons/briefcase.svg";
import { ReactComponent as ProfileAIIcon } from "@/assets/icons/profile-ai.svg";
import { useGetChatSessions } from "@/features/chatbot/useGetChatSessions";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";

interface ChatSidebarProps {
  activeMenu?: string;
  onMenuClick?: (menu: string) => void;
  onChatClick?: (id: number) => void;
}

const ChatSidebar = ({
  activeMenu,
  onMenuClick,
  onChatClick,
}: ChatSidebarProps) => {
  const { data: chatSessions = [] } = useGetChatSessions();
  const { data: profile } = useGetMyProfile();
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const navItems = [
    {
      key: "edit",
      icon: <SquareAndPencilIcon width={18} height={18} />,
      label: "새 채팅",
      onClick: () => onMenuClick?.("edit"),
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
    <nav
      className={`flex flex-col bg-[#fafafa] border-r border-[#e5e5e5] h-full overflow-hidden transition-[width] duration-200 ease-in-out ${
        expanded ? "w-[240px]" : "w-12"
      }`}
    >
      {/* 로고 */}
      <div
        onClick={() => setExpanded((v) => !v)}
        className={`flex items-center gap-2 p-2 cursor-pointer ${expanded ? "mb-3" : "mb-[26px]"}`}
      >
        <div className="flex justify-center items-center w-8 h-8 rounded-[10px] bg-hub-primary shrink-0">
          <IconAI width={32} height={32} />
        </div>
        {expanded && (
          <span className="font-pt-body2-medium text-hub-black-1 whitespace-nowrap">
            StartHub AI
          </span>
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
        className={`flex flex-col px-2 ${
          expanded ? "items-stretch gap-2" : "items-center gap-[18px]"
        }`}
      >
        {navItems.map(({ key, icon, label, onClick }) => {
          const isActive = activeMenu === key;
          return (
            <button
              key={key}
              onClick={onClick}
              className={[
                "flex items-center h-8 border-none rounded-lg cursor-pointer text-[13px] font-medium whitespace-nowrap transition-colors [&_svg]:shrink-0",
                expanded
                  ? "justify-start gap-[10px] px-2 w-auto"
                  : "justify-center w-8 p-0",
                isActive && expanded
                  ? "bg-[rgba(36,102,244,0.08)] text-hub-primary"
                  : "bg-transparent",
                isActive ? "text-hub-primary" : "text-hub-black-1",
                "hover:text-hub-primary",
                expanded ? "hover:bg-[rgba(36,102,244,0.08)]" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {icon}
              {expanded && label}
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
          <div className="flex flex-col px-2 gap-2 overflow-y-auto flex-1">
            {chatSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onChatClick?.(session.id)}
                className="flex items-center px-2 py-2 border-none rounded-lg bg-transparent text-hub-black-1 text-[13px] font-normal cursor-pointer text-left whitespace-nowrap overflow-hidden text-ellipsis hover:bg-[rgba(36,102,244,0.08)]"
              >
                {session.title}
              </button>
            ))}
          </div>
        </>
      )}

      {/* 하단 프로필 */}
      <div
        className={[
          "flex items-center gap-[10px] mt-auto",
          expanded ? "p-3 border-t border-[#e5e5e5]" : "p-2 justify-center",
        ].join(" ")}
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
  );
};

export default ChatSidebar;
