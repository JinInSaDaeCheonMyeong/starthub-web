import { CreateSessionRequest } from "@/entities/bmc";
import { bmcApi } from "@/entities/bmc/api/bmc";
import useSessionStore from "@/shared/store/useSessionStore";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

export const useCreateSessions = () => {
  const navigate = useNavigate();
  const { setSessionId } = useSessionStore();

  const createSession = async (data: CreateSessionRequest) => {
    try {
      const response = await bmcApi.createSessions(data);
      const { sessionId, createdAt } = response.data;

      toast.success("세션이 생성되었습니다.");
      setSessionId(sessionId, data.title, createdAt);
      navigate("/bmc/generate");

    } catch (error) {
      toast.error('세션 생성에 실패했습니다.');
      console.error("Session creation failed:", error);
    }
  };

  return { createSession };
};