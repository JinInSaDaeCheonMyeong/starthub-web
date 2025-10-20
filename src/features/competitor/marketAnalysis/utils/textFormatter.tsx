import React from "react";
import { StartHubColors } from "@/shared/design";

export const formatTextWithBold = (text: string, useColor: boolean = false) => {
  const parts = text.split(/(<<?[^<>]+>>?)/g);

  return parts.map((part, index) => {
    if (part.startsWith('<<') && part.endsWith('>>')) {
      const content = part.slice(2, -2);
      return (
        <span
          key={index}
          style={{
            fontWeight: 600,
            ...(useColor && { color: StartHubColors.Primary })
          }}
        >
          {content}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export const removeAngleBrackets = (text: string): string => {
  return text.replace(/<<|>>/g, '');
};

export const formatBmcContent = (content?: string): React.ReactNode => {
  if (!content) return "내용이 없습니다.";
  return content.split(/- /).filter(Boolean).map((line, index) => (
    <div key={index} style={{ marginBottom: '8px' }}>
      {index > 0 && '- '}{line}
    </div>
  ));
};
