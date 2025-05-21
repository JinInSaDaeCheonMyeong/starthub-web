import * as S from './style';
import { useState } from 'react';
import { StartHubButton } from '../../components/common/StartHubButton';
import { StartHubColors } from '../../Design/color/StartHubColors';
import { StartHubFont } from '../../Design/text/StartHubFont';
import { StartHubTextField } from "../../components/common/StartHubTextField";

const SignUp = () => {
  const [email, setEmail] = useState('');
  return (
    <S.LoginContainer>
      <S.LoginForm>
        <S.Logo>
          <img src="../../assets/logo/Vector.svg" alt="Logo" />
          <S.LogoText >회원가입</S.LogoText>
        </S.Logo>
        <S.InputLabel>이메일</S.InputLabel>
        <StartHubTextField
        type="text"
        value={email} 
        placeholder="이메일을 입력해주세요"
        onChange={(e) => setEmail(e.target.value)}
        width={200}
        customStyle={{ height: "50px" }} 
      />
        <S.VerificationCodeContainer>
          <S.InputField 
            type="email" 
            placeholder="이메일을 입력해주세요" 
          />
          <S.VerifyButton type="button">인증번호 전송</S.VerifyButton>
        </S.VerificationCodeContainer>
        <StartHubButton
          text="회원가입"
          width={320}
          height={50}
          backgroundColor={StartHubColors.Primary}
          typography={StartHubFont.Pretendard.Body1.Medium}
          onClick={() => console.log("click!")}
          textTheme={StartHubColors.White1}
        />
      </S.LoginForm>
    </S.LoginContainer>
  )
}

export default SignUp;