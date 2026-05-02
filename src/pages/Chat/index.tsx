"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatSidebar from "@/shared/ui/AISidebar";
import StartHubAITextarea from "@/shared/ui/AITextarea";
import AITypingIndicator from "@/shared/ui/AITypingIndicator";
import AIErrorMessage from "@/shared/ui/AIErrorMessage";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";
import { useStreamMessage } from "@/features/chatAI/hooks/useStreamMessage";
import { useGetSessionDetail } from "@/features/chatAI/hooks/useGetSessionDetail";
import { useCreateSession } from "@/features/chatAI/hooks/useCreateSession";
import { markdownComponents } from "@/features/chatAI/utils/markdownComponents";
import { parseAnnotations } from "@/features/chatAI/utils/parseAnnotations";
import { convertEnumToKorean } from "@/features/chatAI/utils/convertEnumToKorean";
import * as S from "./style";

interface DisplayMessage {
  id: number;
  text: string;
  isUser: boolean;
}

const ChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionIdParam = searchParams?.get("sessionId");
  const activeSessionId = sessionIdParam ? Number(sessionIdParam) : null;

  const setActiveSessionId = (id: number | null) => {
    if (id !== null) {
      router.push(`?sessionId=${String(id)}`);
    } else {
      router.push(window.location.pathname);
    }
  };

  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string | null>(null);

  const { data: profile } = useGetMyProfile();
  const { streaming, streamingText, send } = useStreamMessage();
  const { data: sessionDetail } = useGetSessionDetail(activeSessionId);
  const createSessionMutation = useCreateSession();
  const createSession = createSessionMutation.mutate;
  const creatingSession = (createSessionMutation as any).isLoading ?? false;

  useEffect(() => {
    if (!sessionDetail || streaming || pendingMessageRef.current) return;
    setMessages((prev) => {
      const loaded = sessionDetail.messages.map((m) => ({
        id: m.id,
        text: m.role === "USER" ? m.content : parseAnnotations(m.content),
        isUser: m.role === "USER",
      }));
      if (loaded.length <= prev.length) return prev;
      return loaded;
    });
  }, [sessionDetail, streaming]);

  const handleSendToSession = useCallback(
    async (sessionId: number, text: string) => {
      const userMsg: DisplayMessage = {
        id: Date.now(),
        text,
        isUser: true,
      };
      setMessages((prev) => [...prev, userMsg]);

      try {
        setError(null);
        const result = await send(sessionId, text);
        if (result) {
          const aiMsg: DisplayMessage = {
            id: Date.now() + 1,
            text: result,
            isUser: false,
          };
          setMessages((prev) => [...prev, aiMsg]);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "스트리밍 실패";
        setError(errorMessage);
        console.error("스트리밍 실패:", err);
      }
    },
    [send],
  );

  // 새 세션 생성 후 대기 중인 메시지 전송
  useEffect(() => {
    if (activeSessionId && pendingMessageRef.current) {
      const text = pendingMessageRef.current;
      pendingMessageRef.current = null;
      handleSendToSession(activeSessionId, text);
    }
  }, [activeSessionId, handleSendToSession]);

  // 스크롤 하단 유지
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, streamingText]);

  const handleSend = async (text: string) => {
    if (!text.trim() || streaming) return;
    const trimmed = text.trim();

    if (!activeSessionId) {
      // 세션이 없으면 새로 생성 후 메시지 전송
      pendingMessageRef.current = trimmed;
      createSession(
        { title: trimmed.slice(0, 20) },
        {
          onSuccess: (session) => {
            setActiveSessionId(session.id);
          },
        },
      );
      return;
    }

    await handleSendToSession(activeSessionId, trimmed);
  };

  const userName = profile?.username ?? "사용자";
  const hasMessages = messages.length > 0 || streaming;

  return (
    <S.PageWrapper>
      <ChatSidebar
        defaultExpanded={true}
        creatingSession={creatingSession}
        onChatClick={(id) => {
          setActiveSessionId(id);
          setMessages([]);
          setError(null);
        }}
        onNewChat={() => {
          setActiveSessionId(null);
          setMessages([]);
          setError(null);
        }}
      />

      <S.ChatArea>
        {!hasMessages ? (
          <S.WelcomeWrapper>
            <S.WelcomeTitle>
              <span>Hub</span>
              <span> AI</span>
            </S.WelcomeTitle>
            <S.WelcomeGreeting>
              {userName}님! 무엇을 도와드릴까요?
            </S.WelcomeGreeting>
            <S.WelcomeInput>
              <StartHubAITextarea
                onSubmit={handleSend}
                disabled={streaming}
                maxWidth="900px"
              />
            </S.WelcomeInput>
          </S.WelcomeWrapper>
        ) : (
          <S.MessageList ref={messageListRef}>
            {messages.map((msg) =>
              msg.isUser ? (
                <S.UserBubble key={msg.id}>{msg.text}</S.UserBubble>
              ) : (
                <S.AIMessageWrapper key={msg.id}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {convertEnumToKorean(msg.text)}
                  </ReactMarkdown>
                </S.AIMessageWrapper>
              ),
            )}
            {streaming && !streamingText && (
              <S.AIMessageWrapper>
                <AITypingIndicator />
              </S.AIMessageWrapper>
            )}
            {streaming && streamingText && (
              <S.AIMessageWrapper>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {convertEnumToKorean(streamingText)}
                </ReactMarkdown>
              </S.AIMessageWrapper>
            )}
            {error && (
              <AIErrorMessage message={error} onRetry={() => setError(null)} />
            )}
          </S.MessageList>
        )}

        {hasMessages && (
          <S.InputArea>
            <StartHubAITextarea
              onSubmit={handleSend}
              disabled={streaming}
              maxWidth="900px"
            />
          </S.InputArea>
        )}
      </S.ChatArea>
    </S.PageWrapper>
  );
};

export default ChatPage;
