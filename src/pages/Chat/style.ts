import styled from "styled-components";
import { StartHubColors } from "@/shared/design";

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${StartHubColors.White1};
`;

/* ── Welcome (empty) ── */

export const WelcomeWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

export const WelcomeInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 10px;
`;

export const WelcomeTitle = styled.p`
  font-size: 56px;
  font-weight: 700;
  text-align: center;

  span:first-child {
    color: ${StartHubColors.Primary};
  }
  span:last-child {
    color: #000;
  }
`;

export const WelcomeGreeting = styled.p`
  font-size: 28px;
  color: #000;
  text-align: center;
`;

export const SuggestionChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
`;

export const Chip = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: #f5f5f5;
  font-size: 16px;
  color: #000;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #ebebeb;
  }
`;

/* ── Messages ── */

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserBubble = styled.div`
  align-self: flex-end;
  max-width: 80%;
  padding: 10px 20px;
  border-radius: 10px;
  background: #f5f5f5;
  font-size: 16px;
  color: #000;
  word-break: break-word;
`;

export const AIMessageWrapper = styled.div`
  align-self: flex-start;
  max-width: 100%;

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

/* ── Input ── */

export const InputArea = styled.div`
  padding: 0px 16px 24px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;
