import { Container, Message } from "./style";
import { useOAuthCallback } from "@/features/auth/oauth/model/useOAuthCallback";

const OAuthCallback = () => {
  useOAuthCallback();

  return (
    <Container>
      <Message>로그인 중...</Message>
    </Container>
  );
};

export default OAuthCallback;