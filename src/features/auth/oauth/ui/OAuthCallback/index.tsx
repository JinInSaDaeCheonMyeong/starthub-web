import * as S from "./style";
import { useOAuthCallback } from "@/features/auth/oauth/model/useOAuthCallback";

const OAuthCallback = () => {
  const { error } = useOAuthCallback();

  return (
    <S.Container>
      {!error && <S.Spinner />}
      <S.Message>{error ? "로그인 실패" : "로그인 중입니다..."}</S.Message>
    </S.Container>
  );
};

export default OAuthCallback;
