import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { StartHubColors, StartHubFont } from "@/shared/design";

interface IconBadgeProps {
  left?: boolean;
  right?: boolean;
  $expanded?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const sharedInputStyles = css`
  width: 100%;
  box-sizing: border-box;
  color: ${StartHubColors.Black1};
  ${StartHubFont.Pretendard.Body2.Regular}

  ::placeholder {
    color: ${StartHubColors.Gray2};
    opacity: 1;
  }
`;

export const sharedIconStyles = css<{
  $expanded?: boolean;
  left?: boolean;
  right?: boolean;
}>`
  position: absolute;
  left: ${(p) => (p.left ? "12px" : "auto")};
  right: ${(p) => (p.right ? "12px" : "auto")};
  top: ${(p) => (p.$expanded ? "auto" : "50%")};
  bottom: ${(p) => (p.$expanded ? "18px" : "auto")};
  transform: ${(p) => (p.$expanded ? "none" : "translateY(-50%)")};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 3;
  transition:
    top 160ms ease,
    transform 160ms ease,
    background-color 160ms ease;
`;

export const Textarea = styled.textarea<{ $expanded?: boolean }>`
  ${sharedInputStyles}
  resize: none;
  overflow: hidden;
  border: none;
  background: transparent;
  width: 100%;
  ${StartHubFont.Pretendard.Body2.Regular}
  caret-color: ${StartHubColors.Primary};

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const InputWrapper = styled.div<{ $expanded?: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: ${(p) => (p.$expanded ? "flex-start" : "center")};
  padding: ${(p) => (p.$expanded ? "18px 18px 28px" : "12px 56px")};
  border-radius: ${(p) => (p.$expanded ? "16px" : "9999px")};
  min-height: ${(p) => (p.$expanded ? "160px" : "50px")};
  height: ${(p) => (p.$expanded ? "auto" : "50px")};
  transition:
    padding 160ms ease,
    border-radius 160ms ease,
    min-height 160ms ease,
    align-items 160ms ease;
  border: 1px solid ${StartHubColors.Gray3};
  background: ${StartHubColors.White1};
  overflow: visible;
  &:focus-within {
    border-color: ${StartHubColors.Primary};
    .left-icon {
      background: rgba(36, 102, 244, 0.12);
    }
  }
`;

export const IconBadge = styled(motion.div).attrs<{
  left?: boolean;
  right?: boolean;
}>((p) => ({
  className: p.left ? "left-icon" : undefined,
}))<IconBadgeProps>`
  all: unset;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  cursor: pointer;
  ${sharedIconStyles}
`;

export const IconButton = styled(motion.button)<{ $expanded?: boolean }>`
  all: unset;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  ${sharedIconStyles}
  right: 12px;
  background: rgba(36, 102, 244, 0.12);
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FileRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    height: 0;
  }
`;

export const FileChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 12px;
  color: ${StartHubColors.Gray2};
  border: 1px solid ${StartHubColors.Gray3};
  backdrop-filter: blur(20px);
  ${StartHubFont.Pretendard.Body2.Regular}
  max-width: 230px;
  flex: 0 0 auto;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
`;

export const FileRemove = styled.button`
  all: unset;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
`;