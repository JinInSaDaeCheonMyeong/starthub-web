import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatAIApi } from "@/entities/chatAI/api/chatAI";
import { CHAT_QUERY_KEYS } from "@/entities/chatAI/queryKey";

export const useUpdateSessionTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, title }: { sessionId: number; title: string }) =>
      ChatAIApi.updateSessionTitle(sessionId, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEYS.sessions.all(),
      });
    },
  });
};
