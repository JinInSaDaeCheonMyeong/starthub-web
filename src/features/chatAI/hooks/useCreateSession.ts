import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatAIApi } from "@/entities/chatAI/api/chatAI";
import { CHAT_QUERY_KEYS } from "@/entities/chatAI/queryKey";
import { USER_QUERY_KEYS } from "@/entities/user/queryKey";

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
    onError: (err: any) => {
      if (err?.response?.status === 403 || err?.status === 403) {
        queryClient.invalidateQueries({
          queryKey: USER_QUERY_KEYS.user.getUserProfile,
        });
      }
    },
  });

  return mutation;
};
