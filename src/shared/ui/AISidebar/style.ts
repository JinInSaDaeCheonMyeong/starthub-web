// import styled from "styled-components";
// import { StartHubColors } from "@/shared/design";
// import { StartHubFont } from "@/shared/design";

// export const SidebarContainer = styled.nav<{ $expanded?: boolean }>`
//   display: flex;
//   flex-direction: column;
//   background: #fafafa;
//   border-right: 1px solid #e5e5e5;
//   width: ${({ $expanded }) => ($expanded ? "240px" : "48px")};
//   height: 100%;
//   transition: width 0.2s ease;
//   overflow-y: auto;
//   overflow-x: hidden;
// `;

// export const LogoWrapper = styled.div<{ $expanded?: boolean }>`
//   display: flex;
//   align-items: center;
//   justify-content: ${({ $expanded }) =>
//     $expanded ? "space-between" : "center"};
//   gap: 8px;
//   padding: 8px;
//   margin-bottom: ${({ $expanded }) => ($expanded ? "12px" : "26px")};
//   position: relative;
//   transition: all 0.2s ease;
//   overflow: visible;

//   ${({ $expanded }) =>
//     !$expanded &&
//     `
//     &:hover ${LogoButton} {
//       opacity: 0;
//       visibility: hidden;
//     }

//     &:hover button {
//       opacity: 1 !important;
//       visibility: visible !important;
//       pointer-events: auto !important;
//     }
//   `}
// `;

// export const LogoButton = styled.div<{ $expanded?: boolean }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 32px;
//   height: 32px;
//   border-radius: 10px;
//   background: ${StartHubColors.Primary};
//   flex-shrink: 0;
//   transition: all 0.2s ease;

//   ${({ $expanded }) =>
//     $expanded &&
//     `
//     opacity: 1;
//     visibility: visible;
//     cursor: pointer;
    
//     &:hover {
//       opacity: 0.9;
//     }
//   `}

//   ${({ $expanded }) =>
//     !$expanded &&
//     `
//     opacity: 1;
//     visibility: visible;
//     cursor: default;
//   `}
// `;

// export const LogoContent = styled.div<{ $expanded?: boolean }>`
//   display: ${({ $expanded }) => ($expanded ? "flex" : "none")};
//   align-items: center;
//   gap: 8px;
//   flex: ${({ $expanded }) => ($expanded ? 1 : 0)};
//   opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
//   visibility: ${({ $expanded }) => ($expanded ? "visible" : "hidden")};
//   transition: all 0.2s ease;
// `;

// export const ToggleButton = styled.button<{ $expanded?: boolean }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 32px;
//   height: 32px;
//   padding: 0;
//   border: none;
//   border-radius: 8px;
//   background: transparent;
//   cursor: pointer;
//   flex-shrink: 0;
//   transition: all 0.2s ease;
//   color: #666;
//   z-index: 10;

//   ${({ $expanded }) =>
//     !$expanded &&
//     `
//     position: absolute;
//     left: 8px;
//     top: 8px;
//     opacity: 0;
//     visibility: hidden;
//     pointer-events: none;
//   `}

//   ${({ $expanded }) =>
//     $expanded &&
//     `
//     position: static;
//     opacity: 1;
//     visibility: visible;
//     pointer-events: auto;
//   `}

//   &:hover {
//     background: rgba(36, 102, 244, 0.1);
//     color: #333;
//   }
// `;

// export const LogoTitle = styled.span`
//   font: ${StartHubFont.Pretendard.Body2.Medium};
//   color: ${StartHubColors.Black1};
//   white-space: nowrap;
// `;

// export const SectionLabel = styled.div`
//   padding: 4px 16px;
//   font: ${StartHubFont.Pretendard.Caption2.Regular};
//   color: ${StartHubColors.Gray2};
//   white-space: nowrap;
// `;

// export const NavSection = styled.div<{ $expanded?: boolean }>`
//   display: flex;
//   flex-direction: column;
//   align-items: ${({ $expanded }) => ($expanded ? "stretch" : "center")};
//   padding: ${({ $expanded }) => ($expanded ? "0 8px" : "0 8px")};
//   gap: 8px;
//   padding-top: ${({ $expanded }) => ($expanded ? "0" : "10px")};
// `;

// export const NavButton = styled.button<{
//   $active?: boolean;
//   $expanded?: boolean;
// }>`
//   display: flex;
//   justify-content: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
//   align-items: center;
//   gap: 10px;
//   width: ${({ $expanded }) => ($expanded ? "auto" : "32px")};
//   height: 32px;
//   padding: ${({ $expanded }) => ($expanded ? "8px" : "0")};
//   border: none;
//   border-radius: 8px;
//   background: ${({ $active, $expanded }) =>
//     $active && $expanded ? "rgba(36, 102, 244, 0.08)" : "transparent"};
//   cursor: pointer;
//   color: ${({ $active }) =>
//     $active ? StartHubColors.Primary : StartHubColors.Black1};
//   font-size: 13px;
//   font-weight: 500;
//   white-space: nowrap;

//   &:hover {
//     color: ${StartHubColors.Primary};
//     ${({ $expanded }) => $expanded && "background: rgba(36, 102, 244, 0.08);"}
//   }

//   svg {
//     flex-shrink: 0;
//   }
// `;

// export const Divider = styled.hr`
//   border: none;
//   border-top: 1px solid #e5e5e5;
//   margin: 8px 12px;
// `;

// export const ChatList = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 0 8px;
//   gap: 0;
//   overflow-y: auto;
//   flex: 1;
// `;

// export const ChatItemWrapper = styled.div`
//   position: relative;
// `;

// export const ChatItem = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
//   padding: 7px 12px;
//   border: none;
//   border-radius: 8px;
//   background: transparent;
//   color: ${StartHubColors.Black1};
//   font-size: 13px;
//   font-weight: 400;
//   cursor: pointer;
//   text-align: left;

//   &:hover {
//     background: rgba(36, 102, 244, 0.08);
//   }
// `;

// export const ChatItemTitle = styled.span`
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   flex: 1;
//   min-width: 0;
// `;

// export const MoreButton = styled.span`
//   flex-shrink: 0;
//   width: 24px;
//   height: 24px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 4px;
//   font-size: 14px;
//   font-weight: 700;
//   letter-spacing: 1px;
//   color: ${StartHubColors.Gray2};
//   opacity: 0;
//   transition: opacity 0.15s;

//   ${ChatItem}:hover & {
//     opacity: 1;
//   }

//   &:hover {
//     background: rgba(0, 0, 0, 0.06);
//     color: ${StartHubColors.Black1};
//   }
// `;

// export const ChatEditInput = styled.input`
//   width: 100%;
//   padding: 7px 12px;
//   border: 1px solid ${StartHubColors.Primary};
//   border-radius: 8px;
//   background: ${StartHubColors.White1};
//   font-size: 13px;
//   color: ${StartHubColors.Black1};
//   outline: none;
// `;

// export const ContextMenu = styled.div`
//   position: absolute;
//   top: 100%;
//   right: 8px;
//   z-index: 100;
//   min-width: 140px;
//   padding: 6px 0;
//   background: ${StartHubColors.White1};
//   border: 1px solid #e5e5e5;
//   border-radius: 10px;
//   box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
// `;

// export const ContextMenuItem = styled.button<{ $danger?: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   width: 100%;
//   padding: 10px 14px;
//   border: none;
//   background: transparent;
//   font-size: 13px;
//   font-weight: 500;
//   color: ${({ $danger }) => ($danger ? "#e53e3e" : StartHubColors.Black1)};
//   cursor: pointer;
//   white-space: nowrap;

//   &:hover {
//     background: ${({ $danger }) =>
//       $danger ? "rgba(229, 62, 62, 0.06)" : "rgba(36, 102, 244, 0.06)"};
//   }

//   span {
//     font-size: 14px;
//   }
// `;

// export const BottomSection = styled.div<{ $expanded?: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-top: auto;
//   padding: ${({ $expanded }) => ($expanded ? "12px" : "8px")};
//   ${({ $expanded }) => !$expanded && "justify-content: center;"}
//   ${({ $expanded }) => $expanded && "border-top: 1px solid #e5e5e5;"}
// `;

// export const ProfileButton = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 32px;
//   height: 32px;
//   border-radius: 8px;
//   background: rgba(36, 102, 244, 0.15);
//   overflow: hidden;
//   flex-shrink: 0;
// `;

// export const ProfileInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
// `;

// export const ProfileName = styled.span`
//   font-size: 13px;
//   font-weight: 600;
//   color: ${StartHubColors.Black1};
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// export const ProfileEmail = styled.span`
//   font-size: 11px;
//   color: ${StartHubColors.Gray2};
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
