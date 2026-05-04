import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AIMessage from "@/shared/ui/AIMessage";
import StartHubAITextarea from "@/shared/ui/AITextarea";
import AIErrorMessage from "@/shared/ui/AIErrorMessage";
import AITypingIndicator from "@/shared/ui/AITypingIndicator";
import { ReactComponent as Logo } from "@/assets/logo/leaf.svg";
import useChatAI from "./hooks/useChatAI";
import { markdownComponents } from "@/features/chatAI/utils/markdownComponents";
import { convertEnumToKorean } from "@/features/chatAI/utils/convertEnumToKorean";

const ChatAIWidget = () => {
  const {
    open, visible, toggleOpen,
    messages, messageListRef,
    streaming, streamingText,
    error, handleSubmit, handleRetry,
  } = useChatAI();

  const aiMessageClass = `
    max-w-full font-pt-body2-regular text-[11px] px-2 py-3 rounded-[10px] break-words select-text
    [&_p]:mb-[6px] [&_p:last-child]:mb-0
    [&_h1]:font-bold [&_h1]:text-[15px] [&_h1]:mt-[10px] [&_h1]:mb-1
    [&_h2]:font-bold [&_h2]:text-[14px] [&_h2]:mt-[10px] [&_h2]:mb-1
    [&_h3]:font-bold [&_h3]:text-[13px] [&_h3]:mt-[10px] [&_h3]:mb-1
    [&_h4]:font-bold [&_h4]:text-[12px] [&_h4]:mt-[10px] [&_h4]:mb-1
    [&_strong]:font-bold [&_em]:italic
    [&_ul]:my-1 [&_ul]:pl-[18px] [&_ol]:my-1 [&_ol]:pl-[18px] [&_li]:my-[2px]
    [&_code]:bg-[rgba(36,102,244,0.12)] [&_code]:px-[5px] [&_code]:py-[1px] [&_code]:rounded [&_code]:text-[11px] [&_code]:font-mono
    [&_pre]:bg-[rgba(36,102,244,0.08)] [&_pre]:rounded-lg [&_pre]:px-3 [&_pre]:py-[10px] [&_pre]:overflow-x-auto [&_pre]:my-[6px]
    [&_pre_code]:bg-transparent [&_pre_code]:p-0
    [&_blockquote]:border-l-[3px] [&_blockquote]:border-hub-primary [&_blockquote]:my-[6px] [&_blockquote]:pl-[10px] [&_blockquote]:text-hub-gray-2
    [&_hr]:border-none [&_hr]:border-t [&_hr]:border-hub-gray-3 [&_hr]:my-2
    [&_a]:text-hub-primary [&_a]:underline
    [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_table]:text-[11px]
    [&_th]:border [&_th]:border-hub-gray-3 [&_th]:px-2 [&_th]:py-[6px] [&_th]:text-left [&_th]:align-top [&_th]:bg-[rgba(36,102,244,0.08)] [&_th]:font-bold [&_th]:text-hub-black-2
    [&_td]:border [&_td]:border-hub-gray-3 [&_td]:px-2 [&_td]:py-[6px] [&_td]:text-left [&_td]:align-top [&_td]:break-words
  `;

  return (
    <div className="fixed bottom-8 right-8 z-[1000] flex flex-col items-end gap-3">
      {/* 채팅창 */}
      {visible && (
        <div
          className={`w-[285px] h-[405px] bg-hub-white-1 border border-hub-gray-3 rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.13)] flex flex-col overflow-hidden ${
            open ? "animate-fade-in-up" : "animate-fade-out-down"
          }`}
        >
          {/* 메시지 목록 */}
          <div
            ref={messageListRef}
            className="flex-1 overflow-y-auto pt-[22px] px-2 pb-0 flex flex-col gap-[10px] select-text [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-hub-gray-3 [&::-webkit-scrollbar-thumb]:rounded"
          >
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                {msg.role === "USER" ? (
                  <div className="flex justify-end w-full">
                    <AIMessage text={msg.content} type="small" />
                  </div>
                ) : (
                  <div className={aiMessageClass}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {convertEnumToKorean(msg.content)}
                    </ReactMarkdown>
                  </div>
                )}

                {msg.attachments && msg.attachments.length > 0 && (
                  <div
                    className={`w-full flex gap-2 pt-[6px] px-2 box-border items-center ${
                      msg.role === "USER" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.attachments.map((a) =>
                      a.isImage ? (
                        <a key={a.url} href={a.url} target="_blank" rel="noopener noreferrer" title={a.name}>
                          <img src={a.url} alt={a.name} className="w-14 h-14 rounded-lg object-cover border border-hub-gray-3 shrink-0" />
                        </a>
                      ) : (
                        <a
                          key={a.url}
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={a.name}
                          className="inline-flex items-center gap-2 px-[10px] py-[6px] rounded-lg bg-hub-white-1 border border-hub-gray-3 text-hub-gray-2 font-pt-body2-regular text-[13px] max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap no-underline hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                        >
                          {a.name}
                        </a>
                      ),
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}

            {streaming && !streamingText && <AITypingIndicator />}
            {streaming && streamingText && (
              <div className={aiMessageClass}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {convertEnumToKorean(streamingText)}
                </ReactMarkdown>
              </div>
            )}
            {error && <AIErrorMessage message={error} onRetry={handleRetry} />}
          </div>

          {/* 텍스트에어리어 */}
          <div className="px-[10px] pb-2 shrink-0">
            <StartHubAITextarea compact onSubmit={handleSubmit} disabled={streaming} />
          </div>
        </div>
      )}

      {/* 토글 버튼 */}
      <div
        onClick={toggleOpen}
        className="w-[52px] h-[52px] rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-[1.07] active:scale-[0.96] [&_svg]:w-[26px] [&_svg]:h-[26px]"
        style={{
          background: open
            ? "linear-gradient(180deg, rgba(36,102,244,0.5) 0%, rgba(255,255,255,1) 100%)"
            : "#2466F4",
          backdropFilter: open ? "blur(10px)" : "none",
          boxShadow: open
            ? "inset 0 -2px 6px rgba(36,102,244,0.4), inset 0 1px 4px rgba(26,90,227,0.5)"
            : "0 4px 16px rgba(36,102,244,0.35)",
        }}
      >
        <Logo style={{ color: open ? "#2466F4" : "#FFFFFF" }} />
      </div>
    </div>
  );
};

export default ChatAIWidget;