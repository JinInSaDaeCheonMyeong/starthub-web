import styled from "styled-components";
import { StartHubColors } from "@/shared/design";
import { StartHubFont } from "@/shared/design";

export const SidebarContainer = styled.nav<{ $expanded?: boolean }>`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border-right: 1px solid #e5e5e5;
  width: ${({ $expanded }) => ($expanded ? "240px" : "48px")};
  height: 100%;
  transition: width 0.2s ease;
  overflow: hidden;
`;

export const LogoWrapper = styled.div<{ $expanded?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  margin-bottom: ${({ $expanded }) => ($expanded ? "12px" : "26px")};
  cursor: pointer;
`;

export const LogoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${StartHubColors.Primary};
  flex-shrink: 0;
`;

export const LogoTitle = styled.span`
  font : ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Black1};
  white-space: nowrap;
`;

export const SectionLabel = styled.div`
  padding: 4px 16px;
  font : ${StartHubFont.Pretendard.Caption2.Regular};
  color: ${StartHubColors.Gray2};
  white-space: nowrap;
`;

export const NavSection = styled.div<{ $expanded?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $expanded }) => ($expanded ? "stretch" : "center")};
  padding: ${({ $expanded }) => ($expanded ? "0 8px" : "0 8px")};
  gap: ${({ $expanded }) => ($expanded ? "8px" : "18px")};
`;

export const NavButton = styled.button<{
  $active?: boolean;
  $expanded?: boolean;
}>`
  display: flex;
  justify-content: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
  align-items: center;
  gap: 10px;
  width: ${({ $expanded }) => ($expanded ? "auto" : "32px")};
  height: 32px;
  padding: ${({ $expanded }) => ($expanded ? "8px" : "0")};
  border: none;
  border-radius: 8px;
  background: ${({ $active, $expanded }) =>
    $active && $expanded ? "rgba(36, 102, 244, 0.08)" : "transparent"};
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? StartHubColors.Primary : StartHubColors.Black1};
  font-size: 13rpx;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    color: ${StartHubColors.Primary};
    ${({ $expanded }) =>
      $expanded && "background: rgba(36, 102, 244, 0.08);"}
  }

  svg {
    flex-shrink: 0;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 8px 12px;
`;

export const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  gap: 8px;
  overflow-y: auto;
  flex: 1;
`;

export const ChatItem = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${StartHubColors.Black1};
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: rgba(36, 102, 244, 0.08);
  }
`;

export const BottomSection = styled.div<{ $expanded?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding: ${({ $expanded }) => ($expanded ? "12px" : "8px")};
  ${({ $expanded }) => !$expanded && "justify-content: center;"}
  ${({ $expanded }) => $expanded && "border-top: 1px solid #e5e5e5;"}
`;

export const ProfileButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(36, 102, 244, 0.15);
  overflow: hidden;
  flex-shrink: 0;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ProfileName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${StartHubColors.Black1};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProfileEmail = styled.span`
  font-size: 11px;
  color: ${StartHubColors.Gray2};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
