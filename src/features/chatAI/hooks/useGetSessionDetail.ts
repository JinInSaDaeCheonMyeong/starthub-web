import { useQuery } from "@tanstack/react-query";
import { ChatAIApi } from "@/entities/chatAI/api/chatAI";
import { CHAT_QUERY_KEYS } from "@/entities/chatAI/queryKey";

export const useGetSessionDetail = (sessionId: number | null) =>
  useQuery({
    queryKey: CHAT_QUERY_KEYS.sessions.detail(sessionId!),
    queryFn: () => ChatAIApi.getSessionDetail(sessionId!),
    enabled: sessionId !== null,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
