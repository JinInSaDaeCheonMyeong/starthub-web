import { Container, Spinner, Message } from "./style";
import { useOAuthCallback } from "@/features/auth/oauth/model/useOAuthCallback";

const OAuthCallback = () => {
  const { error } = useOAuthCallback();

  return (
    <Container>
      {!error && <Spinner />}
      <Message>{error ? "로그인 실패" : "로그인 중입니다..."}</Message>
    </Container>
  );
};

export default OAuthCallback;
