"use client";
import {
  StartHubButton,
  StartHubTextField,
  StartHubCheckBox,
} from "@/shared/ui";
import { StartHubLogo } from "@assets/logo";
import SocialButton from "@/features/auth/social/ui/SocialButton";
import { useState } from "react";
import Link from "next/link";
import { useSignIn } from "../../model/useSignIn";

const SignInBox = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [autoSignIn, setAutoSignIn] = useState(false);
  const { signIn, isLoading } = useSignIn();
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const AuthHandleSubmit = () => {
    let hasError = false;

    if (!email) {
      setIsEmailError(true);
      hasError = true;
    }

    if (!password) {
      setIsPasswordError(true);
      hasError = true;
    }

    if (hasError) return;

    signIn({ email, password });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      AuthHandleSubmit();
    }
  };

  return (
    <div className="absolute flex flex-col items-center">
      <div className="text-center mb-[34px]">
        <StartHubLogo className="w-[134px] h-[55px]" />
        <p className="text-hub-black-1 font-pt-body1-regular">
          스타트업 <span className="text-hub-primary">시작</span>부터{" "}
          <span className="text-hub-primary">성공</span>까지
        </p>
      </div>

      <StartHubTextField
        type="text"
        value={email}
        width={320}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsEmailError(false);
        }}
        onKeyDown={handleKeyDown}
        placeholder="이메일을 입력해주세요"
        isError={isEmailError}
        supportingText={isEmailError ? "이메일을 입력해주세요" : ""}
        className="margin-bottom-10px"
      />

      <StartHubTextField
        type="password"
        value={password}
        width={320}
        onChange={(e) => {
          setPassword(e.target.value);
          setIsPasswordError(false);
        }}
        onKeyDown={handleKeyDown}
        placeholder="비밀번호를 입력해주세요"
        isError={isPasswordError}
        supportingText={isPasswordError ? "비밀번호를 입력해주세요" : ""}
        className="margin-bottom-10px"
      />

      <StartHubButton
        text="로그인"
        onClick={AuthHandleSubmit}
        disabled={isLoading}
        className="
          w-[320px] h-[50px]
          mb-[20px]
          rounded-[10px]
          bg-hub-primary
          text-hub-white-1
          hover:bg-[#235FE0]
          font-pt-body1-medium
        "
      />

      <div className="w-[320px] flex items-center justify-between mb-[15px]">
        <div className="flex items-center">
          <StartHubCheckBox checked={autoSignIn} onChange={setAutoSignIn} />
          <p className="ml-[4px] text-hub-gray-2 font-pt-caption1-medium">
            자동 로그인
          </p>
        </div>

        <Link href="/sign-up" className="no-underline">
          <p className="text-hub-gray-2 font-pt-caption1-medium hover:text-hub-primary cursor-pointer">
            회원가입
          </p>
        </Link>
      </div>

      <SocialButton />
    </div>
  );
};

export default SignInBox;
