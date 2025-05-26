import { StartHubTextField } from "../common"
import { EyeIcon, EyeOffIcon } from "@/assets/icons"
import { useState } from "react";
import * as S from "./style"

const SignUpBox = () =>{
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return(
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
          <S.InputButton>인증하기</S.InputButton>
        </S.VerificationWrapper>

        <S.InputLabel>비밀번호</S.InputLabel>
        <S.PasswordInputContainer>
          <StartHubTextField
            type="password"
            value={password}
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setPassword(e.target.value)}
            width={320}
          />
          <S.IconWrapper>
            <EyeIcon width={22} height={17} />
          </S.IconWrapper>
        </S.PasswordInputContainer>

        <S.PasswordInputContainer>
          <StartHubTextField
            type="password"
            value={confirmPassword}
            placeholder="비밀번호를 다시 한번 입력해주세요"
            onChange={(e) => setConfirmPassword(e.target.value)}
            width={320}
          />
          <S.IconWrapper>
            <EyeOffIcon width={22} height={17} />
          </S.IconWrapper>
        </S.PasswordInputContainer>
        </>
    )
}

export default SignUpBox;