import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
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
  const navigate = useNavigate();

  return (
    <S.SidebarContainer $expanded={expanded}>
      <S.LogoWrapper $expanded={expanded} onClick={() => setExpanded((v) => !v)}>
        <S.LogoButton>
          <IconAI width={32} height={32} />
        </S.LogoButton>
        {expanded && <S.LogoTitle>StartHub AI</S.LogoTitle>}
      </S.LogoWrapper>

      {expanded && <S.SectionLabel>StartHub</S.SectionLabel>}

      <S.NavSection $expanded={expanded}>
        <S.NavButton
          $active={activeMenu === "edit"}
          $expanded={expanded}
          onClick={() => onMenuClick?.("edit")}
        >
          <SquareAndPencilIcon width={18} height={18} />
          {expanded && "새 채팅"}
        </S.NavButton>

        <S.NavButton
          $active={activeMenu === "news"}
          $expanded={expanded}
          onClick={() => navigate("/notices")}
        >
          <NewspaperIcon width={18} height={18} />
          {expanded && "공고 보러가기"}
        </S.NavButton>

        <S.NavButton
          $active={activeMenu === "chart"}
          $expanded={expanded}
          onClick={() => navigate("/competitor")}
        >
          <ChartBarIcon width={18} height={18} />
          {expanded && "경쟁사 분석"}
        </S.NavButton>

        <S.NavButton
          $active={activeMenu === "briefcase"}
          $expanded={expanded}
          onClick={() => navigate("/bmc")}
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
              <S.ChatItem key={session.id} onClick={() => onChatClick?.(session.id)}>
                {session.title}
              </S.ChatItem>
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

export default ChatSidebar;
