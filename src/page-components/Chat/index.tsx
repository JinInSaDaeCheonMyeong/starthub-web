"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatSidebar from "@/shared/ui/AISidebar";
import StartHubAITextarea from "@/shared/ui/AITextarea";
import AITypingIndicator from "@/shared/ui/AITypingIndicator";
import AIErrorMessage from "@/shared/ui/AIErrorMessage";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";
import { useStreamMessage } from "@/features/chatAI/hooks/useStreamMessage";
import { useGetSessionDetail } from "@/features/chatAI/hooks/useGetSessionDetail";
import { useCreateSession } from "@/features/chatAI/hooks/useCreateSession";
import { markdownComponents } from "@/features/chatAI/utils/markdownComponents";
import { parseAnnotations } from "@/features/chatAI/utils/parseAnnotations";
import { convertEnumToKorean } from "@/features/chatAI/utils/convertEnumToKorean";
import { ReactComponent as Logo } from "@/assets/logo/logo.svg";

interface DisplayMessage {
  id: number;
  text: string;
  isUser: boolean;
}

const ChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const sessionIdParam = searchParams?.get("sessionId");
  const activeSessionId = sessionIdParam ? Number(sessionIdParam) : null;

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("로그인 후 이용하실 수 있습니다.", { toastId: "login-required-chat" });
      router.push("/sign-in");
    }
  }, [isLoggedIn, router]);

  const setActiveSessionId = (id: number | null) => {
    if (id !== null) {
      router.push(`?sessionId=${String(id)}`);
    } else {
      router.push(window.location.pathname);
    }
  };

  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-pt-body2-medium text-hub-gray-2">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-pt-body2-medium text-hub-gray-2">로그인 페이지로 이동 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 데스크톱 사이드바 */}
      <div className="hidden lg:block">
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
      </div>

      {/* 모바일 사이드바 오버레이 */}
      <div className="lg:hidden">
        <ChatSidebar
          defaultExpanded={false}
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
      </div>

      <div className="flex-1 flex flex-col h-full bg-hub-white-1 lg:ml-0">
        {/* 모바일 헤더 - 숨김 */}
        <div className="hidden">
          <Logo className="h-8" />
        </div>
        {!hasMessages ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 lg:p-6">
            <p className="font-pt-display1-bold lg:font-pt-display2-bold text-center">
              <span className="text-hub-primary">Hub</span>
              <span className="text-hub-black-1"> AI</span>
            </p>
            <p className="font-pt-body1-regular lg:font-pt-body2-regular text-hub-black-1 text-center px-4">
              {userName}님! 무엇을 도와드릴까요?
            </p>
            <div className="w-full flex justify-center mb-4 lg:mb-7.5 mt-2 lg:mt-2.5 max-w-175 px-4">
              <StartHubAITextarea
                onSubmit={handleSend}
                disabled={streaming}
                maxWidth="900px"
              />
            </div>
          </div>
        ) : (
          <div
            className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col items-center gap-3 w-full max-w-225 mx-auto"
            ref={messageListRef}
          >
            {messages.map((msg) =>
              msg.isUser ? (
                <div className="flex justify-end w-full" key={msg.id}>
                  <div className="max-w-[85%] lg:max-w-4/5 p-3 rounded-xl bg-hub-primary text-hub-white-1 font-pt-caption1-regular lg:font-pt-body2-regular wrap-break-word">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="self-start max-w-full p-3 rounded-xl bg-hub-gray-4 font-pt-caption1-regular lg:font-pt-body2-regular text-hub-black-1 leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {convertEnumToKorean(msg.text)}
                  </ReactMarkdown>
                </div>
              ),
            )}
            {streaming && !streamingText && (
              <div className="self-start max-w-full">
                <AITypingIndicator />
              </div>
            )}
            {streaming && streamingText && (
              <div className="self-start max-w-full p-3 rounded-xl bg-hub-gray-4 font-pt-caption1-regular lg:font-pt-body2-regular text-hub-black-1 leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {convertEnumToKorean(streamingText)}
                </ReactMarkdown>
              </div>
            )}
            {error && (
              <AIErrorMessage message={error} onRetry={() => setError(null)} />
            )}
          </div>
        )}

        {hasMessages && (
          <div className="p-4 shrink-0 flex justify-center w-full max-w-225 mx-auto">
            <StartHubAITextarea
              onSubmit={handleSend}
              disabled={streaming}
              maxWidth="100%"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
