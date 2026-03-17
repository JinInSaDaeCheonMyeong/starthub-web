import { useQuery } from "@tanstack/react-query";
import { chatbotApi } from "@/entities/chatbot/api/chatbot";
import { CHATBOT_QUERY_KEYS } from "@/entities/chatbot/queryKey";

export const useGetChatSessions = () => {
  return useQuery({
    queryKey: CHATBOT_QUERY_KEYS.sessions(),
    queryFn: () => chatbotApi.getSessions(),
    select: (res) => res.data,
  });
};
