import { useEffect, useRef, useState } from "react";
import { useCreateSession } from "@/features/chatAI/hooks/useCreateSession";
import { useStreamMessage } from "@/features/chatAI/hooks/useStreamMessage";
import { ChatMessage } from "@/entities/chatAI/model/types";

type LastInput = {
  text: string;
  files?: File[];
} | null;

export const useChatAI = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastInput, setLastInput] = useState<LastInput>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: createSession } = useCreateSession();
  const { streaming, streamingText, error, clearError, send } =
    useStreamMessage();
  const createdUrlsRef = useRef<string[]>([]);
  const messageIdRef = useRef<number>(-1);
  const getNextMessageId = () => messageIdRef.current--;

  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch (e) {}
      });
    };
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("chatSessionId");
    if (stored) {
      setSessionId(Number(stored));
      return;
    }
    createSession({ title: "새 대화" }).then((session) => {
      setSessionId(session.id);
      sessionStorage.setItem("chatSessionId", String(session.id));
    });
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, streamingText, open]);

  const toggleOpen = () => {
    if (!open) {
      setVisible(true);
      setOpen(true);
    } else {
      setOpen(false);
      setTimeout(() => setVisible(false), 180);
    }
  };

  const handleSubmit = async (text: string, files?: File[]) => {
    if (!text.trim() || !sessionId || streaming) return;

    setLastInput({ text: text.trim(), files });

    const attachments = files?.map((f) => {
      const url = URL.createObjectURL(f);
      createdUrlsRef.current.push(url);
      return {
        name: f.name,
        url,
        fileType: f.type,
        isImage: f.type.startsWith("image"),
      };
    });

    const userMsg: ChatMessage = {
      id: getNextMessageId(),
      role: "USER",
      content: text.trim(),
      createdAt: new Date().toISOString(),
      attachments,
    };
    setMessages((prev) => [...prev, userMsg]);

    const result = await send(sessionId, text.trim(), files);
    if (result) {
      setMessages((prev) => [
        ...prev,
        {
          id: getNextMessageId(),
          role: "ASSISTANT",
          content: result,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleRetry = async () => {
    if (!lastInput || !sessionId || streaming) return;
    clearError();

    const result = await send(sessionId, lastInput.text, lastInput.files);

    if (result) {
      setMessages((prev) => [
        ...prev,
        {
          id: getNextMessageId(),
          role: "ASSISTANT",
          content: result,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  return {
    open,
    visible,
    toggleOpen,
    messages,
    messageListRef,
    streaming,
    streamingText,
    error,
    clearError,
    handleSubmit,
    handleRetry,
  } as const;
};

export default useChatAI;
