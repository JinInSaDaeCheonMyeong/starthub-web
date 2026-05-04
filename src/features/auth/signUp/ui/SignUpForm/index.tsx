import { useMemo } from "react";
import { StartHubTextField } from "../../../../../shared/ui";
import { SignUpFormData } from "@/entities/user/model/types";

interface SignUpBoxProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    verificationCode: string;
  };
  handleFormChange: (field: keyof SignUpFormData, value: string) => void;
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

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

const SignUpBox = ({
  formData,
  handleFormChange,
  handleSendVerificationCode,
  handleVerifyCode,
  codeSent,
  isEmailVerified,
  loadingStates,
  fieldErrors,
}: SignUpBoxProps) => {
  const isVerificationCodeEmpty = !formData?.verificationCode?.trim();
  const isEmailEmpty = !formData?.email?.trim();

  const isPasswordValid = useMemo(
    () => (formData?.password ? PASSWORD_REGEX.test(formData.password) : false),
    [formData?.password],
  );

  return (
    <>
      {/* Email Section */}
      <div className="flex flex-col gap-[10px] w-full">
        <p className="font-pt-body1-medium text-black">
          이메일
        </p>
        <div className="flex flex-col gap-[10px]">
          <div className="flex gap-[12px]">
            <StartHubTextField
              type="email"
              value={formData?.email || ""}
              placeholder="이메일을 입력해주세요"
              onChange={(e) => handleFormChange("email", e.target.value)}
              width={200}
              isDisabled={isEmailVerified}
              supportingText={fieldErrors?.email}
              autoComplete="email"
            />

            <button
              onClick={handleSendVerificationCode}
              disabled={
                isEmailEmpty || loadingStates?.sendCode || isEmailVerified
              }
              className="
                flex items-center justify-center
                w-[108px] h-[50px]
                bg-white
                text-hub-primary
                font-pt-caption1-medium
                border border-hub-primary
                rounded-[10px]
                whitespace-nowrap
                transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loadingStates?.sendCode
                ? "전송중..."
                : isEmailVerified
                  ? "인증완료"
                  : codeSent
                    ? "재전송"
                    : "인증번호 전송"}
            </button>
          </div>

          <div className="w-[320px]">
            <div className="relative">
              <StartHubTextField
                type="text"
                value={formData?.verificationCode || ""}
                placeholder="인증번호를 입력해주세요"
                onChange={(e) => handleFormChange("verificationCode", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                width={320}
                isDisabled={isEmailVerified}
                supportingText={fieldErrors?.verificationCode}
                className="border-hub-primary"
              />

              <button
                onClick={handleVerifyCode}
                disabled={
                  isVerificationCodeEmpty ||
                  loadingStates?.verifyCode ||
                  isEmailVerified
                }
                className="
                  absolute right-[20px] top-[25px]
                  text-hub-primary
                  font-pt-caption1-medium
                  bg-transparent border-none
                  transition z-10
                  disabled:text-hub-gray-3 disabled:cursor-not-allowed
                  -translate-y-1/2
                "
              >
                {loadingStates?.verifyCode
                  ? "확인중..."
                  : isEmailVerified
                    ? "인증완료"
                    : "인증하기"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="flex flex-col gap-[10px] w-full">
        <div className="flex gap-[4px] items-center">
          <p className="font-pt-body2-medium text-black">
            비밀번호
          </p>
          <p className="font-pt-caption2-medium text-black text-[12px]">
            (영어 대소문자, 특수문자, 숫자 포함 8~16자)
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <StartHubTextField
            type="password"
            value={formData?.password || ""}
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => handleFormChange("password", e.target.value)}
            width={320}
            isError={!!fieldErrors?.password}
            supportingText={
              fieldErrors?.password ||
              (!isPasswordValid && formData?.password
                ? "비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다."
                : "")
            }
            autoComplete="new-password"
          />

          <StartHubTextField
            type="password"
            value={formData?.confirmPassword || ""}
            placeholder="비밀번호를 다시 한번 입력해주세요"
            onChange={(e) => handleFormChange("confirmPassword", e.target.value)}
            width={320}
            isError={!!fieldErrors?.confirmPassword}
            supportingText={
              fieldErrors?.confirmPassword ||
              (formData?.password !== formData?.confirmPassword &&
              formData?.confirmPassword
                ? "비밀번호가 일치하지 않습니다."
                : "")
            }
            autoComplete="new-password"
          />
        </div>
      </div>
    </>
  );
};

export default SignUpBox;
