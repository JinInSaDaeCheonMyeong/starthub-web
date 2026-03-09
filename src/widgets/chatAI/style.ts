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

export const TextareaArea = styled.div`
  padding: 10px 8px;
  flex-shrink: 0;
`;

export const UserMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const AIChatMessage = styled.div`
  max-width: 90%;
  background: #E9F0FE;
  ${StartHubFont.Pretendard.Body2.Regular}
  font-size:11px;
  padding: 12px 8px;
  border-radius: 10px;
  word-break: break-word;
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
