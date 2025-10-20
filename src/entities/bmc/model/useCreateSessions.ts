import { CreateSessionRequest } from "@/entities/bmc";
import { bmcApi } from "@/entities/bmc/api/bmc";
import useSessionStore from "@/entities/bmc/model/useSessionStore";
import useQuestionStore from "@/entities/bmc/model/useQuestionStore";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

export const useCreateSessions = () => {
  const navigate = useNavigate();
  const { setSessionId } = useSessionStore();
  const { resetStore } = useQuestionStore();

  const createSession = async (data: CreateSessionRequest) => {
    try {
      resetStore();

      const response = await bmcApi.createSessions(data);
      const { sessionId, createdAt } = response.data;

      toast.success("세션이 생성되었습니다.");
      setSessionId(sessionId, data.title, new Date(createdAt), data.templateType);
      navigate("/bmc/generate");

    } catch (error) {
      toast.error('세션 생성에 실패했습니다.');
      console.error("Session creation failed:", error);
    }
  };

  return { createSession };
};