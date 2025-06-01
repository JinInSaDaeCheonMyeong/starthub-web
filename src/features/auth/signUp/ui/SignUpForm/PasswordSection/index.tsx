import { StartHubTextField } from "@/shared/ui";
import { EyeIcon, EyeOffIcon } from "@/assets/icons";
import { useState } from "react";
import * as S from "./style";

const PasswordSection = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const renderPasswordField = (
    value: string,
    setValue: (val: string) => void,
    placeholder: string,
    isVisible: boolean,
    setVisible: (val: boolean) => void
  ) => (
    <S.PasswordInputContainer>
      <StartHubTextField
        type={isVisible ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        width={320}
      />
      {value && (
        <S.IconWrapper>
          {isVisible ? (
            <EyeIcon width={22} height={17} onClick={() => setVisible(false)} />
          ) : (
            <EyeOffIcon
              width={22}
              height={17}
              onClick={() => setVisible(true)}
            />
          )}
        </S.IconWrapper>
      )}
    </S.PasswordInputContainer>
  );

  return (
    <>
      <S.InputLabel>비밀번호</S.InputLabel>
      {renderPasswordField(
        password,
        setPassword,
        "비밀번호를 입력해주세요",
        showPassword,
        setShowPassword
      )}
      {renderPasswordField(
        confirmPassword,
        setConfirmPassword,
        "비밀번호를 다시 한번 입력해주세요",
        showConfirmPassword,
        setShowConfirmPassword
      )}
    </>
  );
};

export default PasswordSection;
