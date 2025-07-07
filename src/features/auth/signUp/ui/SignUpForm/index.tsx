import { useMemo } from "react";
import { StartHubTextField } from "../../../../../shared/ui";
import * as S from "./style";


interface SignUpBoxProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    verificationCode: string;
  };
  handleFormChange: (field: string, value: string) => void;
  handleSendVerificationCode: () => Promise<void>;
  handleVerifyCode: () => Promise<void>;
  codeSent: boolean;
  isEmailVerified: boolean;
  loadingStates: {
    sendCode: boolean;
    verifyCode: boolean;
  };
  fieldErrors: {
    email: string;
    password: string;
    confirmPassword: string;
    verificationCode: string;
    agreement: string;
  };
}

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

const SignUpBox = ({
  formData,
  handleFormChange,
  handleSendVerificationCode,
  handleVerifyCode,
  codeSent,
  isEmailVerified,
  loadingStates,
  fieldErrors
}: SignUpBoxProps) => {
  const isVerificationCodeEmpty = !formData.verificationCode.trim();
  const isEmailEmpty = !formData.email.trim();

  const isPasswordValid = useMemo(
    () => PASSWORD_REGEX.test(formData.password),
    [formData.password]
  );

  return (
    <>
      <S.EmailContainer>
        <S.InputLabel>이메일</S.InputLabel>
        <S.VerificationCodeContainer $hasError={!!fieldErrors.email}>
          <StartHubTextField
            type="text"
            value={formData.email}
            placeholder="이메일을 입력해주세요"
            onChange={(e) => handleFormChange("email", e.target.value)}
            width={200}
            isDisabled={isEmailVerified}
            supportingText={fieldErrors.email}
          />
          <S.VerifyButton
            onClick={handleSendVerificationCode}
            disabled={isEmailEmpty || loadingStates.sendCode || isEmailVerified}
          >
            {loadingStates.sendCode
              ? "전송중..."
              : isEmailVerified
              ? "인증완료"
              : codeSent
              ? "재전송"
              : "인증번호 전송"}
          </S.VerifyButton>
        </S.VerificationCodeContainer>
      </S.EmailContainer>

      <S.VerificationWrapper>
        <StartHubTextField
          type="text"
          value={formData.verificationCode}
          placeholder="인증번호를 입력해주세요"
          onChange={(e) => handleFormChange("verificationCode", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          width={320}
          isDisabled={isEmailVerified}
          supportingText={fieldErrors.verificationCode}
        />
        <S.InputButton
          onClick={handleVerifyCode}
          disabled={isVerificationCodeEmpty || loadingStates.verifyCode || isEmailVerified}
          $isActive={!isVerificationCodeEmpty && !isEmailVerified}
        >
          {loadingStates.verifyCode
            ? "확인중..."
            : isEmailVerified
            ? "인증완료"
            : "인증하기"}
        </S.InputButton>
      </S.VerificationWrapper>

      <S.InputLabel>비밀번호</S.InputLabel>
      <S.PasswordInputContainer $hasError={!!fieldErrors.password}>
        <StartHubTextField
          type="password"
          value={formData.password}
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => handleFormChange("password", e.target.value)}
          width={320}
          isError={!!fieldErrors.password}
          supportingText={fieldErrors.password || (!isPasswordValid && formData.password ? "비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다." : "")}
        />
      </S.PasswordInputContainer>
      <S.PasswordInputContainer $hasError={!!fieldErrors.confirmPassword}>
        <StartHubTextField
          type="password"
          value={formData.confirmPassword}
          placeholder="비밀번호를 다시 입력해주세요"
          onChange={(e) => handleFormChange("confirmPassword", e.target.value)}
          width={320}
          isError={!!fieldErrors.confirmPassword}
          supportingText={fieldErrors.confirmPassword || (formData.password !== formData.confirmPassword && formData.confirmPassword ? "비밀번호가 일치하지 않습니다." : "")}
        />
      </S.PasswordInputContainer>
    </>
  );
};

export default SignUpBox;
