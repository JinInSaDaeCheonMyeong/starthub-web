import * as S from "./style";
import { useState } from "react";
import { StartHubColors, StartHubFont } from "@/design";
import { StartHubButton, StartHubTextField, StartHubCheckBox } from "@/components/common";
import { EyeIcon, EyeOffIcon } from "@/assets/icons";
import { ReactComponent as LogoIcon } from "@/assets/logo/Vector.svg";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 제출", {
      email,
      verificationCode,
      password,
      confirmPassword,
    });
  };

  return (
    <S.LoginContainer>
      <S.LoginForm onSubmit={handleSubmit}>
        <S.Logo>
          <LogoIcon width={143} height={55} />
        </S.Logo>
        <S.Title>회원가입</S.Title>
        <S.InputLabel>이메일</S.InputLabel>
        <S.VerificationCodeContainer>
          <StartHubTextField
            type="text"
            value={email}
            placeholder="이메일을 입력해주세요"
            onChange={(e) => setEmail(e.target.value)}
            width={200}
          />
          <S.VerifyButton type="button">인증번호 전송</S.VerifyButton>
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

        <S.CheckboxContainer>
          <StartHubCheckBox checked={isChecked} onChange={setIsChecked} />
          <S.CheckboxLabelMain>
            전체 동의
          </S.CheckboxLabelMain>
        </S.CheckboxContainer>

        <S.Divider/>

        <S.CheckboxContainer>
          <StartHubCheckBox
            checked={isChecked}
            onChange={setIsChecked}
          />
          <S.CheckboxLabel>
            [필수] 만 14세 이상입니다.
          </S.CheckboxLabel>
        </S.CheckboxContainer>

        <S.CheckboxContainer>
          <StartHubCheckBox
            checked={isChecked}
            onChange={setIsChecked}
          />
          <S.CheckboxLabel>
            [필수] 스타트허브 이용약관 동의
          </S.CheckboxLabel>
        </S.CheckboxContainer>

        <S.CheckboxContainer>
          <StartHubCheckBox checked={isChecked} onChange={setIsChecked} />
          <S.CheckboxLabel>
            [필수] 스타트허브 개인정보 수집 및 이용 동의
          </S.CheckboxLabel>
        </S.CheckboxContainer>

        <StartHubButton
          text="회원가입"
          width={320}
          height={50}
          backgroundColor={StartHubColors.Primary}
          typography={StartHubFont.Pretendard.Body1.Medium}
          onClick={() => {}}
          textTheme={StartHubColors.White1}
          customStyle={{ marginTop: "20px" }}
        />
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default SignUpPage;
