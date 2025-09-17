import * as S from "./style";
import { ReactComponent as UserProfile } from "@/assets/images/user-profile.svg";
import { ReactComponent as StartHubProfile } from "@/assets/images/starthub-profile.svg";

type MessageProps = {
  message: string;
  isMine: boolean;
};

const Message = ({ message, isMine }: MessageProps) => {
  return isMine ? (
    <S.UserMessageContainer>
      <S.UserMessageBubbleWrapper>{message}</S.UserMessageBubbleWrapper>
      <UserProfile width={40} height={40} />
    </S.UserMessageContainer>
  ) : (
    <S.StartHubMessageContainer>
      <StartHubProfile width={40} height={40} />
      <div>
        <p style={{ marginBottom: 3 }}>스타트허브 AI(별명: MC몽)</p>
        <S.StartHubMessageBubbleWrapper>{message}</S.StartHubMessageBubbleWrapper>
      </div>
    </S.StartHubMessageContainer>
  );
  
};
export default Message;
