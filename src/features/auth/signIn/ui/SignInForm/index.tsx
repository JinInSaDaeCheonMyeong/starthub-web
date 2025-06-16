import {
  StartHubButton,
  StartHubTextField,
  StartHubCheckBox,
} from "@/shared/ui";
import { StartHubLogo } from "@assets/logo";
import SocialButton from "./SocialButton";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./style";
import { useSignIn } from "../../model/useSignIn";

const SignInBox = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [autoSignIn, setAutoSignIn] = useState(false);
  const { signIn, isLoading } = useSignIn();
  const [isEmailError, setIsEmailError] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)

  const AuthHandleSubmit = () => {
    if (email && password) {
      signIn({ email, password });
    } else if(!email && !password) {
      setIsEmailError(true)
      setIsPasswordError(true)
      return;
    }
    if (!email) {
      setIsEmailError(true)
      return;
    } else if (!password) {
      setIsPasswordError(true)
      return;
    }
  };
  
  return (
    <S.SignBoxContainer>
      <S.SignInLogoField>
        <StartHubLogo style={{ width: "134px", height: "55px" }} />
        <S.SignInNormalText>
          스타트업 <span>시작</span>부터 <span>성공</span>까지
        </S.SignInNormalText>
      </S.SignInLogoField>

      <StartHubTextField
        type="text"
        value={email}
        width={320}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsEmailError(false);
        }}
        placeholder="이메일을 입력해주세요"
        isError={isEmailError}
        supportingText="이메일을 입력해주세요"
        customStyle={{ marginBottom: "10px" }}
      />

      <StartHubTextField
        type="password"
        value={password}
        width={320}
        onChange={(e) => {
          setPassword(e.target.value);
          setIsPasswordError(false);
        }}
        placeholder="비밀번호를 입력해주세요"
        isError={isPasswordError}
        supportingText="비밀번호를 입력해주세요"
        customStyle={{ marginBottom: "10px" }}
      />

      <StartHubButton
        text="로그인"
        width={320}
        height={50}
        typography={StartHubFont.Pretendard.Body1.Medium}
        backgroundColor={StartHubColors.Primary}
        textTheme={StartHubColors.White1}
        onClick={AuthHandleSubmit}
        disabled={isLoading}
        customStyle={{
          borderRadius: "10px",
          marginBottom: "20px",
        }}
        hover="#235FE0"
      />

      <S.SignInOptions>
        <S.AutoSignInField>
          <StartHubCheckBox checked={autoSignIn} onChange={setAutoSignIn} />
          <p>자동 로그인</p>
        </S.AutoSignInField>
        <Link to="/sign-up" style={{ textDecoration: "none" }}>
          <p>회원가입</p>
        </Link>
      </S.SignInOptions>

      <SocialButton />
    </S.SignBoxContainer>
  );
};
export default SignInBox;
