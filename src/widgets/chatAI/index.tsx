import { useState, useRef, useEffect } from "react";
import * as S from "./style";
import AIMessage from "@/shared/ui/AIMessage";
import StartHubAITextarea from "@/shared/ui/AITextarea";
import { ReactComponent as Logo } from "@/assets/logo/leaf.svg";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  text: "공고를 이렇게 찾고 있나요? 어떤 서비스를 이용하시고, 어떤 공고를 찾으시나요?",
  isUser: false,
};

const ChatAIWidget = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const messageListRef = useRef<HTMLDivElement>(null);
// 예시 ChatAI 위젯, 실제로는 API 연동 필요, 뷰 완성
  const toggleOpen = () => {
    if (!open) {
      setVisible(true);
      setOpen(true);
    } else {
      setOpen(false);
      setTimeout(() => setVisible(false), 180);
    }
  };

  useEffect(() => {
    if (open && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: "네, 도움을 드릴게요! 조금 더 자세하게 알려주시겠어요?",
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  return (
    <S.Wrapper>
      {visible && (
        <S.ChatWindow $open={open}>
          <S.MessageList ref={messageListRef}>
            {messages.map((msg) =>
              msg.isUser ? (
                <S.UserMessageWrapper key={msg.id}>
                  <AIMessage key={msg.id} text={msg.text} type="small"/>
                </S.UserMessageWrapper>
              ) : (
                <S.AIChatMessage key={msg.id}>{msg.text}</S.AIChatMessage>
              ),
            )}
          </S.MessageList>

          <S.TextareaArea>
            <StartHubAITextarea onSubmit={handleSubmit} />
          </S.TextareaArea>
        </S.ChatWindow>
      )}

      <S.ToggleButton $open={open} onClick={toggleOpen} aria-label="AI 채팅">
        <Logo />
      </S.ToggleButton>
    </S.Wrapper>
  );
};

export default ChatAIWidget;
