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
      <div className="relative">
        <label className="mt-[20px] text-hub-black-1 font-pt-body2-medium">
          이메일
        </label>

        <div className="flex items-center gap-[10px] w-full max-w-[320px] mt-[10px] max-sm:flex-col max-sm:max-w-full">
          <div className="flex justify-between w-full">
            <StartHubTextField
              type="text"
              value={formData?.email || ""}
              placeholder="이메일을 입력해주세요"
              onChange={(e) => handleFormChange("email", e.target.value)}
              width={200}
              isDisabled={isEmailVerified}
              supportingText={fieldErrors?.email}
            />

            <button
              onClick={handleSendVerificationCode}
              disabled={
                isEmailEmpty || loadingStates?.sendCode || isEmailVerified
              }
              className="
                flex justify-center items-center
                px-[16px]
                h-[50px]
                bg-hub-white-1
                text-hub-primary
                font-pt-caption1-medium
                border border-hub-primary
                rounded-[8px]
                whitespace-nowrap
                transition
                w-full max-w-[108px] min-w-[108px]
                max-sm:max-w-full
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
        </div>
      </div>

      <div className="relative flex w-full max-w-[320px] items-start gap-[5px] max-sm:max-w-full">
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
        />

        <button
          onClick={handleVerifyCode}
          disabled={
            isVerificationCodeEmpty ||
            loadingStates?.verifyCode ||
            isEmailVerified
          }
          className={`
            absolute right-[5px] top-[15px]
            px-[10px] h-[20px]
            rounded-[4px]
            font-pt-caption1-medium
            transition
            ${
              !isVerificationCodeEmpty && !isEmailVerified
                ? "text-hub-primary cursor-pointer opacity-100"
                : "text-hub-gray-3 cursor-not-allowed opacity-60"
            }
          `}
        >
          {loadingStates?.verifyCode
            ? "확인중..."
            : isEmailVerified
              ? "인증완료"
              : "인증하기"}
        </button>
      </div>

      <label className="mt-[20px] text-hub-black-1 font-pt-body2-medium">
        비밀번호
      </label>

      <div
        className={`relative w-full max-w-[320px] ${
          fieldErrors?.password ? "mb-[24px]" : ""
        } max-sm:max-w-full`}
      >
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
        />
      </div>

      <div
        className={`relative w-full max-w-[320px] ${
          fieldErrors?.confirmPassword ? "mb-[24px]" : ""
        } max-sm:max-w-full`}
      >
        <StartHubTextField
          type="password"
          value={formData?.confirmPassword || ""}
          placeholder="비밀번호를 다시 입력해주세요"
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
        />
      </div>
    </>
  );
};

export default SignUpBox;
