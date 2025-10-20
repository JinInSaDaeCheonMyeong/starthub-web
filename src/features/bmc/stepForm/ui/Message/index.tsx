import * as S from "./style";
import { ReactComponent as UserProfile } from "@/assets/images/user-profile.svg";
import { ReactComponent as StartHubProfile } from "@/assets/images/starthub-profile.svg";
import TypeHangul from "@/shared/ui/TypeHangul";
import { useMemo } from "react";

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
  const messageId = useMemo(
    () => `typing-message-${questionNumber}`,
    [questionNumber]
  );

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
          {enableTyping ? (
            <TypeHangul text={message} speed={20} targetId={messageId} />
          ) : (
            message
          )}
        </S.StartHubMessageBubbleWrapper>
      </div>
    </S.StartHubMessageContainer>
  );
};

export default Message;
