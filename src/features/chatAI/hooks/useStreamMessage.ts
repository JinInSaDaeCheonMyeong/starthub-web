import { useCallback, useRef, useState } from "react";
import { ChatAIApi } from "@/entities/chatAI/api/chatAI";
import { useQueryClient } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "@/entities/chatAI/queryKey";
import { parseAnnotations } from "@/features/chatAI/utils/parseAnnotations";

interface UseStreamMessageReturn {
  streaming: boolean;
  streamingText: string;
  send: (sessionId: number, message: string, files?: File[]) => Promise<string>;
}

export const useStreamMessage = (): UseStreamMessageReturn => {
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const queryClient = useQueryClient();
  const abortRef = useRef<AbortController | null>(null);

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

      let accumulated = "";

      try {
        const stream = await ChatAIApi.streamMessage(sessionId, {
          message,
          files,
        });
        const reader = stream.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          chunk
            .split("\n")
            .filter((line) => line.startsWith("data:"))
            .forEach((line) => {
              try {
                const json = JSON.parse(line.replace(/^data:\s*/, ""));
                if (
                  json.type === "CONTENT_DELTA" &&
                  typeof json.text === "string"
                ) {
                  accumulated += json.text;
                  setStreamingText(parseAnnotations(accumulated));
                }
              } catch {
              }
            });
        }

        queryClient.invalidateQueries({
          queryKey: CHAT_QUERY_KEYS.sessions.detail(sessionId),
        });

        return parseAnnotations(accumulated);
      } finally {
        setStreaming(false);
      }
    },
    [queryClient],
  );

  return { streaming, streamingText, send };
};
