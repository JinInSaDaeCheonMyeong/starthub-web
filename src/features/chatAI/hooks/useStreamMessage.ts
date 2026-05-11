import { useCallback, useRef, useState } from "react";
import { ChatAIApi } from "@/entities/chatAI/api/chatAI";
import { useQueryClient } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "@/entities/chatAI/queryKey";
import { USER_QUERY_KEYS } from "@/entities/user/queryKey";
import { parseAnnotations } from "@/features/chatAI/utils/parseAnnotations";

interface UseStreamMessageReturn {
  streaming: boolean;
  streamingText: string;
  error: string | null;
  clearError: () => void;
  send: (sessionId: number, message: string, files?: File[]) => Promise<string>;
}

export const useStreamMessage = (): UseStreamMessageReturn => {
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const abortRef = useRef<AbortController | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const send = useCallback(
    async (
      sessionId: number,
      message: string,
      files?: File[],
    ): Promise<string> => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setStreaming(true);
      setStreamingText("");

      setError(null);
      let accumulated = "";

      try {
        const stream = await ChatAIApi.streamMessage(sessionId, {
          message,
          files,
        });
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            try {
              const json = JSON.parse(line.replace(/^data:\s*/, ""));
              if (
                json.type === "CONTENT_DELTA" &&
                typeof json.text === "string"
              ) {
                accumulated += json.text;
                setStreamingText(parseAnnotations(accumulated));
              }
            } catch {}
          }
        }

        queryClient.invalidateQueries({
          queryKey: CHAT_QUERY_KEYS.sessions.detail(sessionId),
        });

        return parseAnnotations(accumulated);
      } catch (err) {
        const status = (err as { status?: number })?.status;
        if (status === 403) {
          queryClient.invalidateQueries({
            queryKey: USER_QUERY_KEYS.user.getUserProfile,
          });
        }
        const msg =
          err instanceof Error
            ? err.message
            : "오류가 발생했습니다. 다시 시도해 주세요.";
        setError(msg);
        return "";
      } finally {
        setStreaming(false);
      }
    },
    [queryClient],
  );

  return { streaming, streamingText, error, clearError, send };
};
