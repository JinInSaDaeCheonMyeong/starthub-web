import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as S from "./style";
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
    open,
    visible,
    toggleOpen,
    messages,
    messageListRef,
    streaming,
    streamingText,
    error,
    handleSubmit,
    handleRetry,
  } = useChatAI();

  return (
    <S.Wrapper>
      {visible && (
        <S.ChatWindow $open={open}>
          <S.MessageList ref={messageListRef}>
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                {msg.role === "USER" ? (
                  <S.UserMessageWrapper>
                    <AIMessage text={msg.content} type="small" />
                  </S.UserMessageWrapper>
                ) : (
                  <S.AIChatMessage>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {convertEnumToKorean(msg.content)}
                    </ReactMarkdown>
                  </S.AIChatMessage>
                )}

                {msg.attachments && msg.attachments.length > 0 && (
                  <S.AttachmentRow $alignRight={msg.role === "USER"}>
                    {msg.attachments.map((a) =>
                      a.isImage ? (
                        <a
                          key={a.url}
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={a.name}
                        >
                          <img className="thumb" src={a.url} alt={a.name} />
                        </a>
                      ) : (
                        <a
                          key={a.url}
                          className="file-chip"
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={a.name}
                        >
                          {a.name}
                        </a>
                      ),
                    )}
                  </S.AttachmentRow>
                )}
              </React.Fragment>
            ))}
            {streaming && !streamingText && <AITypingIndicator />}
            {streaming && streamingText && (
              <S.AIChatMessage>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {convertEnumToKorean(streamingText)}
                </ReactMarkdown>
              </S.AIChatMessage>
            )}
            {error && <AIErrorMessage message={error} onRetry={handleRetry} />}
          </S.MessageList>

          <S.TextareaArea>
            <StartHubAITextarea
              compact
              onSubmit={handleSubmit}
              disabled={streaming}
            />
          </S.TextareaArea>
        </S.ChatWindow>
      )}

      <S.ToggleButton $open={open} onClick={toggleOpen}>
        <Logo />
      </S.ToggleButton>
    </S.Wrapper>
  );
};

export default ChatAIWidget;
