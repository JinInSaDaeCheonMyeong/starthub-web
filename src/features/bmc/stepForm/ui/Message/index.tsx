import * as S from "./style";
import { ReactComponent as UserProfile } from "@/assets/images/user-profile.svg";
import { ReactComponent as StartHubProfile } from "@/assets/images/starthub-profile.svg";
import TypeHangul from "@/shared/ui/TypeHangul";
import { useMemo, useState, useEffect } from "react";

type MessageProps = {
  message: string;
  isMine: boolean;
  enableTyping?: boolean;
  questionNumber?: number;
};

const Message = ({
  message,
  isMine,
  enableTyping = false,
  questionNumber = 0,
}: MessageProps) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(!enableTyping);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const messageId = useMemo(
    () => `typing-message-${questionNumber}`,
    [questionNumber]
  );

  useEffect(() => {
    if (enableTyping) {
      setShowFallback(false);
      setIsTypingComplete(false);
      setHasStartedTyping(false);

      // 5초 후에도 타이핑이 시작되지 않으면 fallback 텍스트 표시
      const fallbackTimer = setTimeout(() => {
        if (!isTypingComplete && !hasStartedTyping) {
          setShowFallback(true);
          setIsTypingComplete(true);
        }
      }, 5000);

      return () => clearTimeout(fallbackTimer);
    } else {
      setShowFallback(false);
      setIsTypingComplete(true);
      setHasStartedTyping(false);
    }
  }, [enableTyping, messageId, message]);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
    setShowFallback(false);
  };

  const handleTypingStart = () => {
    setHasStartedTyping(true);
    setShowFallback(false);
  };

  return isMine ? (
    <S.UserMessageContainer>
      <S.UserMessageBubbleWrapper>{message}</S.UserMessageBubbleWrapper>
      <UserProfile width={40} height={40} />
    </S.UserMessageContainer>
  ) : (
    <S.StartHubMessageContainer>
      <StartHubProfile width={40} height={40} />
      <div>
        <p style={{ marginBottom: 3 }}>스타트허브 AI</p>
        <S.StartHubMessageBubbleWrapper id={messageId}>
          {enableTyping && !isTypingComplete && !showFallback ? (
            <TypeHangul
              text={message}
              speed={100}
              targetId={messageId}
              onComplete={handleTypingComplete}
              onStart={handleTypingStart}
            />
          ) : (
            <span style={{ display: 'block', minHeight: '1.2em' }}>
              {message}
            </span>
          )}
        </S.StartHubMessageBubbleWrapper>
      </div>
    </S.StartHubMessageContainer>
  );
};

export default Message;
