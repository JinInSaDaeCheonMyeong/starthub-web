import * as S from "./style";
import SignInBox from "@/features/auth/signIn/ui/SignInForm";
import { ReactComponent as SignInImage } from "@assets/images/signInImage.svg";

const SignInPage = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <S.LeftBoxField>
        <SignInImage style={{ width: "100%", height: "100%" }} />
      </S.LeftBoxField>

      <S.RightBoxField>
        <SignInBox />
      </S.RightBoxField>
    </div>
  );
};

export default SignInPage;
