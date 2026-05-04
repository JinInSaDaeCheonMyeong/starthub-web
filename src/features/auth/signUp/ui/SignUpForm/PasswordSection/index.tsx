import { StartHubTextField } from "@/shared/ui";
import { EyeIcon, EyeOffIcon } from "@/assets/icons";
import { useState } from "react";

interface PasswordSectionProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  passwordSupportingText?: string;
  confirmPasswordSupportingText?: string;
  passwordIsError?: boolean;
  confirmPasswordIsError?: boolean;
}

const PasswordSection = ({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  passwordSupportingText = "",
  confirmPasswordSupportingText = "",
  passwordIsError = false,
  confirmPasswordIsError = false,
}: PasswordSectionProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const renderPasswordField = (
    value: string,
    setValue: (val: string) => void,
    placeholder: string,
    isVisible: boolean,
    setVisible: (val: boolean) => void,
    supportingText: string,
    isError: boolean,
  ) => (
    <div className="relative w-full max-w-[320px] mb-[10px]">
      <StartHubTextField
        type={isVisible ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        width={320}
        isError={isError}
        supportingText={supportingText}
        className="whitespace-nowrap overflow-hidden"
      />

      <div className="absolute top-1/2 right-[15px] -translate-y-1/2 flex cursor-pointer z-[1]">
        {isVisible ? (
          <EyeIcon width={22} height={17} onClick={() => setVisible(false)} />
        ) : (
          <EyeOffIcon width={22} height={17} onClick={() => setVisible(true)} />
        )}
      </div>
    </div>
  );

  return (
    <>
      <label className="mt-[10px] text-hub-black-1 font-pt-body2-medium">
        비밀번호
      </label>

      {renderPasswordField(
        password,
        onPasswordChange,
        "비밀번호를 입력해주세요",
        showPassword,
        setShowPassword,
        passwordSupportingText,
        passwordIsError,
      )}

      {renderPasswordField(
        confirmPassword,
        onConfirmPasswordChange,
        "비밀번호를 다시 한번 입력해주세요",
        showConfirmPassword,
        setShowConfirmPassword,
        confirmPasswordSupportingText,
        confirmPasswordIsError,
      )}
    </>
  );
};

export default PasswordSection;
