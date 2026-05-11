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
import { ChatAIApi } from "@/entities/chatAI/api/chatAI";
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
      toast.info("로그인 후 이용하실 수 있습니다.", {
        toastId: "login-required-chat",
      });
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
  const [quota, setQuota] = useState(null);
  const [quotaError, setQuotaError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const messageListRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);

    // quota 정보 조회
    console.log("Chat 페이지 마운트 - quota API 호출");
    ChatAIApi.getQuota()
      .then((data) => {
        console.log("quota API 성공:", data);
        setQuota(data);
      })
      .catch((error) => {
        console.error("quota API 실패:", error);
      });
  }, []);

  const { data: profile } = useGetMyProfile();
  const isChatbotBanned = profile?.chatbotBanned ?? false;
  const { streaming, streamingText, send } = useStreamMessage();
  const { data: sessionDetail } = useGetSessionDetail(activeSessionId);
  const createSessionMutation = useCreateSession();
  const createSession = createSessionMutation.mutate;
  const creatingSession = (createSessionMutation as any).isLoading ?? false;

  // 사용량 체크 함수
  const checkQuotaAvailable = () => {
    if (!quota) return true;

    if (quota.unlimited) return true;

    // 윈도우 토큰 체크 (단기 제한)
    if (quota.windowTokensRemaining <= 0) {
      const resetTime = quota.windowResetAt
        ? new Date(quota.windowResetAt).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      setQuotaError(
        `단기 사용량 한도에 도달했습니다. ${resetTime ? `${resetTime}에 초기화됩니다.` : ""}`,
      );
      return false;
    }

    // 주간 토큰 체크
    if (quota.weeklyTokensRemaining <= 0) {
      const resetDate = new Date(quota.weeklyResetAt).toLocaleDateString(
        "ko-KR",
        { month: "long", day: "numeric" },
      );
      setQuotaError(
        `주간 사용량 한도에 도달했습니다. ${resetDate}에 초기화됩니다.`,
      );
      return false;
    }

    setQuotaError(null);
    return true;
  };

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

  // 스크롤 하단 유지 - 사용자가 위로 스크롤했을 때는 자동 스크롤 비활성화
  useEffect(() => {
    if (messageListRef.current && shouldAutoScroll) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, streamingText, shouldAutoScroll]);

  // 사용자 스크롤 감지
  const handleScroll = useCallback(() => {
    if (!messageListRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
    // 하단에서 50px 이내면 자동 스크롤 활성화
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShouldAutoScroll(isNearBottom);
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim() || streaming) return;

    // 챗봇 차단 사용자 가드
    if (isChatbotBanned) return;

    // Quota 체크
    if (!checkQuotaAvailable()) {
      return;
    }

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

    // 메시지 전송 후 quota 재조회
    try {
      const updatedQuota = await ChatAIApi.getQuota();
      setQuota(updatedQuota);
    } catch (error) {
      console.error("quota 재조회 실패:", error);
    }
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
          <p className="font-pt-body2-medium text-hub-gray-2">
            로그인 페이지로 이동 중...
          </p>
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
            {isChatbotBanned && (
              <div className="w-full max-w-175 px-4">
                <div className="max-w-[900px] mx-auto bg-red-50 border border-red-300 rounded-lg text-red-600 text-center text-sm font-medium px-4 py-3">
                  부적절하거나 악의적인 챗봇 기능 사용으로 사용이 제한되었습니다.
                </div>
              </div>
            )}
            {/* 사용량 게이지 */}
            {!isChatbotBanned && quota && quota.weeklyTokensUsed !== undefined && (
              <div className="w-full max-w-175 px-4 mb-3">
                <div className="max-w-[900px] mx-auto">
                  <div className="bg-gray-200 rounded-full h-1.5 mb-1">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        quota.weeklyTokensRemaining <= 0
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                      style={{
                        width: `${Math.min(100, (quota.weeklyTokensUsed / quota.weeklyTokenLimit) * 100)}%`,
                      }}
                    />
                  </div>
                  <div
                    className={`text-xs text-center ${
                      quota.weeklyTokensRemaining <= 0
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    AI 사용량{" "}
                    {Math.round(
                      (quota.weeklyTokensUsed / quota.weeklyTokenLimit) * 100,
                    )}
                    %
                  </div>
                  {quotaError && (
                    <div className="text-xs text-red-500 text-center mt-1 bg-red-50 rounded px-2 py-1">
                      {quotaError}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="w-full flex justify-center mb-4 lg:mb-7.5 mt-2 lg:mt-2.5 max-w-175 px-4">
              <StartHubAITextarea
                onSubmit={handleSend}
                disabled={streaming || !!quotaError || isChatbotBanned}
                maxWidth="900px"
                placeholder={
                  isChatbotBanned
                    ? "사용이 제한되었습니다"
                    : quotaError
                      ? "사용량 한도 초과"
                      : undefined
                }
              />
            </div>
          </div>
        ) : (
          <div
            className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col items-center gap-3 w-full max-w-225 mx-auto"
            ref={messageListRef}
            onScroll={handleScroll}
          >
            {messages.map((msg) =>
              msg.isUser ? (
                <div className="flex justify-end w-full" key={msg.id}>
                  <div className="max-w-[85%] lg:max-w-4/5 p-3 rounded-xl text-hub-black-1 bg-[#f5f5f5] font-pt-caption1-regular lg:font-pt-body2-regular wrap-break-word">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id}
                  className="self-start max-w-full p-3 rounded-xl text-hub-black-1 leading-relaxed prose prose-sm max-w-none"
                >
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
              <div className="self-start max-w-full p-3 rounded-xl text-hub-black-1 leading-relaxed prose prose-sm max-w-none">
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
          <div className="shrink-0 w-full max-w-225 mx-auto">
            {isChatbotBanned && (
              <div className="px-4 pb-2">
                <div className="bg-red-50 border border-red-300 rounded-lg text-red-600 text-center text-sm font-medium px-4 py-2">
                  부적절하거나 악의적인 챗봇 기능 사용으로 사용이 제한되었습니다.
                </div>
              </div>
            )}
            {/* 사용량 게이지 */}
            {!isChatbotBanned && quota && quota.weeklyTokensUsed !== undefined && (
              <div className="px-4 pb-2">
                <div className="bg-gray-200 rounded-full h-1.5 mb-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      quota.weeklyTokensRemaining <= 0
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                    style={{
                      width: `${Math.min(100, (quota.weeklyTokensUsed / quota.weeklyTokenLimit) * 100)}%`,
                    }}
                  />
                </div>
                <div
                  className={`text-xs text-center ${
                    quota.weeklyTokensRemaining <= 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  AI 사용량{" "}
                  {Math.round(
                    (quota.weeklyTokensUsed / quota.weeklyTokenLimit) * 100,
                  )}
                  %
                </div>
                {quotaError && (
                  <div className="text-xs text-red-500 text-center mt-1 bg-red-50 rounded px-2 py-1">
                    {quotaError}
                  </div>
                )}
              </div>
            )}

            <div className="p-4 flex justify-center">
              <StartHubAITextarea
                onSubmit={handleSend}
                disabled={streaming || !!quotaError || isChatbotBanned}
                maxWidth="100%"
                placeholder={
                  isChatbotBanned
                    ? "사용이 제한되었습니다"
                    : quotaError
                      ? "사용량 한도 초과"
                      : undefined
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
