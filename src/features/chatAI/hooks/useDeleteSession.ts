import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatAIApi } from "@/entities/chatAI/api/chatAI";
import { CHAT_QUERY_KEYS } from "@/entities/chatAI/queryKey";

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: number) => ChatAIApi.deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEYS.sessions.all(),
      });
    },
  });
};
