import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const OAuthFail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    toast.error(error || "소셜 로그인에 실패하였습니다.");
    navigate("/sign-in", { replace: true });
  }, [navigate, searchParams]);

  return null;
};

export default OAuthFail;
