import * as S from './style';
import { useState } from 'react';
import { StartHubButton } from '../../components/common/StartHubButton';
import { StartHubColors } from '../../Design/color/StartHubColors';
import { StartHubFont } from '../../Design/text/StartHubFont';
import { StartHubTextField } from "../../components/common/StartHubTextField";
import { ReactComponent as LogoIcon } from "../../assets/logo/Vector.svg";
import { StartHubCheckBox } from '../../components/common/CheckBox';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입 제출', { email, verificationCode, password, confirmPassword });
  };

  return (
    <S.LoginContainer>
      <S.LoginForm onSubmit={handleSubmit}>
        <S.Logo>
          <LogoIcon 
          width={143}
          height={55}/>
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
            customStyle={{ height: "50px"}}
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
              customStyle={{ height: "50px"}}
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
            customStyle={{ height: "50px"}}
          />
          <S.ShowPasswordButton type="button">
          </S.ShowPasswordButton>
        </S.PasswordInputContainer>
        
        <S.PasswordInputContainer>
          <StartHubTextField
            type="password"
            value={confirmPassword}
            placeholder="비밀번호를 다시 한번 입력해주세요"
            onChange={(e) => setConfirmPassword(e.target.value)}
            width={320}
            customStyle={{ height: "50px"}}
          />
          <S.ShowPasswordButton type="button">
          </S.ShowPasswordButton>
        </S.PasswordInputContainer>
        
        <S.CheckboxContainer>
          <StartHubCheckBox
          checked = {false}
          onChange={(checked: boolean) => {
            console.log("체크 상태:", checked);
          }}
          disabled = {false}
          />
          <S.CheckboxLabelMain htmlFor="acceptAll">전체 동의</S.CheckboxLabelMain>
        </S.CheckboxContainer>
        
        <S.CheckboxContainer>
          <StartHubCheckBox
            checked = {false}
            onChange={(checked: boolean) => {
              console.log("체크 상태:", checked);
            }}
            disabled = {false}
            />
          <S.CheckboxLabel htmlFor="isAdult">[필수] 만 14세 이상입니다.</S.CheckboxLabel>
        </S.CheckboxContainer>
        
        <S.CheckboxContainer>
          <StartHubCheckBox
            checked = {false}
            onChange={(checked: boolean) => {
              console.log("체크 상태:", checked);
            }}
            disabled = {false}
            />
          <S.CheckboxLabel htmlFor="acceptTerms">[필수] 스타트허브 이용약관 동의</S.CheckboxLabel>
        </S.CheckboxContainer>
        
        <S.CheckboxContainer>
          <StartHubCheckBox
            checked = {false}
            onChange={(checked: boolean) => {
              console.log("체크 상태:", checked);
            }}
            disabled = {false}
            />
          <S.CheckboxLabel htmlFor="acceptPrivacy">[필수] 스타트허브 개인정보 수집 및 이용 동의</S.CheckboxLabel>
        </S.CheckboxContainer>
        
        <StartHubButton
          text="회원가입"
          width={320}
          height={50}
          backgroundColor={StartHubColors.Primary}
          typography={StartHubFont.Pretendard.Body1.Medium}
          onClick={() => console.log("회원가입 클릭!")}
          textTheme={StartHubColors.White1}
          customStyle={{ marginTop: "20px" }}
        />
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default SignUp;