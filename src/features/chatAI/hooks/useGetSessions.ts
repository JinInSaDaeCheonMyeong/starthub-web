import { useQuery } from "@tanstack/react-query";
import { ChatAIApi } from "@/entities/chatAI/api/chatAI";
import { CHAT_QUERY_KEYS } from "@/entities/chatAI/queryKey";

export const useGetSessions = () =>
  useQuery({
    queryKey: CHAT_QUERY_KEYS.sessions.all(),
    queryFn: ChatAIApi.getSessions,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
