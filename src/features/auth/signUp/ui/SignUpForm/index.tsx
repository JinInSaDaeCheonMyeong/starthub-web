import { StartHubTextField } from "../../../../../shared/ui";
import { useState } from "react";
import * as S from "./style";
import PasswordSection from "./PasswordSection";

const SignUpBox = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const isVerificationCodeEmpty = verificationCode.trim() === "";

  return (
    <>
      <S.InputLabel>이메일</S.InputLabel>
      <S.VerificationCodeContainer>
        <StartHubTextField
          type="text"
          value={email}
          placeholder="이메일을 입력해주세요"
          onChange={(e) => setEmail(e.target.value)}
          width={200}
        />
        <S.VerifyButton>인증번호 전송</S.VerifyButton>
      </S.VerificationCodeContainer>

      <S.VerificationWrapper>
        <StartHubTextField
          type="text"
          value={verificationCode}
          placeholder="인증번호를 입력해주세요"
          onChange={(e) => setVerificationCode(e.target.value)}
          width={320}
        />
        <S.InputButton
          disabled={isVerificationCodeEmpty}
          $isActive={!isVerificationCodeEmpty}
        >
          인증하기
        </S.InputButton>
      </S.VerificationWrapper>
      <PasswordSection />
    </>
  );
};

export default SignUpBox;
