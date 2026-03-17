import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatAIApi } from "@/entities/chatAI/api/chatAI";
import { CHAT_QUERY_KEYS } from "@/entities/chatAI/queryKey";

export const useCreateSession = () => {
  const queryClient = useQueryClient();


  let inFlight: Promise<any> | null = null;

  const mutation = useMutation({
    mutationFn: async (body: any) => {
      if (inFlight) return inFlight;
      inFlight = ChatAIApi.createSession(body).finally(() => {
        inFlight = null;
      });
      return inFlight;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEYS.sessions.all(),
      });
    },
  });

  return mutation;
};
