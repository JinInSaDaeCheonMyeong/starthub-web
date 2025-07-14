import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "@/entities/user/api/user";

export const useOAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSignIn = async () => {
      try {
        await new Promise((r) => setTimeout(r, 500));
        const profile = await userApi.userProfile();
        if (profile) {
          navigate('/');
        }
      } catch (err) {
        console.error('로그인 확인 실패:', err);
        toast.error('로그인에 실패하였습니다.');
        navigate('/sign-in');
      }
    };

    checkSignIn();
  }, [navigate]);
};