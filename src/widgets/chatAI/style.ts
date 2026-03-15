import styled, { keyframes, css } from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const fadeOutDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;

export const ChatWindow = styled.div<{ $open: boolean }>`
  width: 285px;
  height: 405px;
  background: ${StartHubColors.White1};
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  animation: ${({ $open }) =>
    $open
      ? css`
          ${fadeInUp} 0.22s ease forwards
        `
      : css`
          ${fadeOutDown} 0.18s ease forwards
        `};
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 22px 8px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${StartHubColors.Gray3};
    border-radius: 4px;
  }
`;

export const AttachmentRow = styled.div<{ $alignRight?: boolean }>`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: ${(p) => (p.$alignRight ? "flex-end" : "flex-start")};
  padding: 6px 8px 0; 
  box-sizing: border-box;
  align-items: center;
  .thumb {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid ${StartHubColors.Gray3};
    flex: 0 0 56px;
  }
  .file-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 8px;
    background: ${StartHubColors.White1};
    border: 1px solid ${StartHubColors.Gray3};
    color: ${StartHubColors.Gray2};
    ${StartHubFont.Pretendard.Body2.Regular}
    font-size: 13px;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
  }
  .file-chip:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
`;

export const TextareaArea = styled.div`
  padding: 0px 10px 8px;
  flex-shrink: 0;
`;

export const UserMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const AIChatMessage = styled.div`
  max-width: 100%;
  ${StartHubFont.Pretendard.Body2.Regular}
  font-size:11px;
  padding: 12px 8px;
  border-radius: 10px;
  word-break: break-word;
  p {
    margin: 0 0 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 700;
    margin: 10px 0 4px;
    line-height: 1.4;
    &:first-child {
      margin-top: 0;
    }
  }
  h1 {
    font-size: 15px;
  }
  h2 {
    font-size: 14px;
  }
  h3 {
    font-size: 13px;
  }
  h4 {
    font-size: 12px;
  }

  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }

  ul,
  ol {
    margin: 4px 0;
    padding-left: 18px;
  }
  li {
    margin: 2px 0;
  }

  code {
    background: rgba(36, 102, 244, 0.12);
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 11px;
    font-family: "Fira Code", monospace;
  }

  pre {
    background: rgba(36, 102, 244, 0.08);
    border-radius: 8px;
    padding: 10px 12px;
    overflow-x: auto;
    margin: 6px 0;
    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid ${StartHubColors.Primary};
    margin: 6px 0;
    padding-left: 10px;
    color: ${StartHubColors.Gray2};
  }

  hr {
    border: none;
    border-top: 1px solid ${StartHubColors.Gray3};
    margin: 8px 0;
  }

  a {
    color: ${StartHubColors.Primary};
    text-decoration: underline;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    font-size: 11px;
  }
  th,
  td {
    border: 1px solid ${StartHubColors.Gray3};
    padding: 6px 8px;
    text-align: left;
    vertical-align: top;
    word-break: break-word;
  }
  th {
    background: rgba(36, 102, 244, 0.08);
    font-weight: 700;
    color: ${StartHubColors.Black2};
  }
  tr:nth-child(even) td {
    background: rgba(0, 0, 0, 0.02);
  }
`;

export const ToggleButton = styled.button<{ $open: boolean }>`
  all: unset;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ $open }) =>
    $open
      ? `linear-gradient(180deg, rgba(36,102,244,0.5) 0%, rgba(255,255,255,1) 100%)`
      : StartHubColors.Primary};
  backdrop-filter: ${({ $open }) => ($open ? "blur(10px)" : "none")};
  -webkit-backdrop-filter: ${({ $open }) => ($open ? "blur(10px)" : "none")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ $open }) =>
    $open
      ? `inset 0 -2px 6px rgba(36, 102, 244, 0.4), inset 0 1px 4px rgba(26, 90, 227, 0.5)`
      : `0 4px 16px rgba(36, 102, 244, 0.35)`};
  transition:
    background 0.2s,
    box-shadow 0.2s,
    transform 0.15s;

  &:hover {
    transform: scale(1.07);
  }

  &:active {
    transform: scale(0.96);
  }

  svg {
    width: 26px;
    height: 26px;
    color: ${({ $open }) =>
      $open ? StartHubColors.Primary : StartHubColors.White1};
  }
`;
