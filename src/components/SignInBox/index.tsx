import { StartHubButton } from "../common/Button";
import { StartHubColors } from "../../Design/color/StartHubColors";
import { StartHubFont } from "../../Design/text/StartHubFont";
import { StartHubTextField } from "../common/TextField";
import { useState } from "react";
import * as S from "./style";
import { ReactComponent as StartHubLogo } from "../../assets/logo/logo.svg";
import { ReactComponent as Google } from "../../assets/icons/google.svg";
import { ReactComponent as Apple } from "../../assets/icons/apple.svg";
import { ReactComponent as Naver } from "../../assets/icons/naver.svg";
import { StartHubCheckBox } from "../common/CheckBox";

const SignInBox = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [autoSignIn, setAutoSignIn] = useState(false);

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
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력해주세요"
        customStyle={{ marginBottom: "10px" }}
      />

      <StartHubTextField
        type="password"
        value={password}
        width={320}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
        customStyle={{ marginBottom: "20px" }}
      />

      <StartHubButton
        text="로그인"
        width={320}
        height={50}
        typography={StartHubFont.Pretendard.Body1.Medium}
        backgroundColor={StartHubColors.Primary}
        textTheme={StartHubColors.White1}
        onClick={() => {}}
        customStyle={{
          borderRadius: "10px",
          marginBottom: "20px",
        }}
        disabled={false}
        hover="#235FE0"
      />

      <S.SignInOptions>
        <S.AutoSignInField>
          <StartHubCheckBox checked={autoSignIn} onChange={setAutoSignIn} />
          <p>자동 로그인</p>
        </S.AutoSignInField>
        <p>회원가입</p>
      </S.SignInOptions>

      <StartHubButton
        icon={<Google style={{ width: "18px", height: "18px" }} />}
        text="Google로 로그인"
        backgroundColor={StartHubColors.White1}
        onClick={() => {}}
        typography={StartHubFont.Pretendard.Caption1.Medium}
        width={320}
        height={50}
        textTheme={StartHubColors.Black1}
        customStyle={{
          boxShadow: `0 0 0 1px ${StartHubColors.Gray3} inset`,
          marginBottom: "12px",
        }}
        hover={StartHubColors.White2}
      />

      <StartHubButton
        icon={<Naver style={{ width: "16px", height: "16px" }} />}
        text="네이버로 로그인"
        backgroundColor="#00C300"
        onClick={() => console.log("click!")}
        typography={StartHubFont.Pretendard.Caption1.Medium}
        width={320}
        height={50}
        textTheme={StartHubColors.White1}
        customStyle={{
          boxShadow: `0 0 0 1px #00BC00 inset`,
          marginBottom: "12px",
        }}
        hover="#10BC10"
      />

      <StartHubButton
        icon={<Apple style={{ width: "14px", height: "17px" }} />}
        text="Apple로 로그인"
        backgroundColor={StartHubColors.Black1}
        onClick={() => console.log("click!")}
        typography={StartHubFont.Pretendard.Caption1.Medium}
        width={320}
        height={50}
        textTheme={StartHubColors.White1}
        customStyle={{ boxShadow: `0 0 0 1px ${StartHubColors.Black1} inset` }}
        hover={StartHubColors.Black2}
      />
    </S.SignBoxContainer>
  );
};
export default SignInBox;
