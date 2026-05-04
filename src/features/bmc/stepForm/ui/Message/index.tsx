import { ReactComponent as UserProfile } from "@/assets/images/user-profile.svg";
import { ReactComponent as StartHubProfile } from "@/assets/images/starthub-profile.svg";
import TypeHangul from "@/shared/ui/TypeHangul";
import { useState, useEffect } from "react";

type MessageProps = {
  message: string;
  isMine: boolean;
  enableTyping?: boolean;
  questionNumber?: number;
};

const Message = ({ message, isMine, enableTyping = false }: MessageProps) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(!enableTyping);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  useEffect(() => {
    if (enableTyping) {
      setShowFallback(false);
      setIsTypingComplete(false);
      setHasStartedTyping(false);

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
  }, [enableTyping, message]);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
    setShowFallback(false);
  };

  const handleTypingStart = () => {
    setHasStartedTyping(true);
    setShowFallback(false);
  };

  return isMine ? (
    <div className="flex justify-end gap-[10px]">
      <div className="max-w-[410px] bg-hub-white-2 px-5 py-4 rounded-lg select-text cursor-text">
        {message}
      </div>
      <UserProfile width={40} height={40} />
    </div>
  ) : (
    <div className="flex gap-[10px] mb-5">
      <StartHubProfile width={40} height={40} />
      <div>
        <p className="mb-[3px]">스타트허브 AI</p>
        <div className="max-w-[410px] bg-[#e9f0fe] px-5 py-4 rounded-lg relative select-text cursor-text">
          {enableTyping && !isTypingComplete && !showFallback ? (
            <TypeHangul
              text={message}
              onComplete={handleTypingComplete}
              onStart={handleTypingStart}
            />
          ) : (
            <span className="block min-h-[1.2em]">{message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
