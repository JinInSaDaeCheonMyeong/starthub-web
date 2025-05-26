import * as S from "./style";
import { StartHubColors, StartHubFont } from "@/design";
import { StartHubButton } from "@/components/common";
import { ReactComponent as LogoIcon } from "@/assets/logo/Vector.svg";
import SignUpBox from "@/components/SignUpBox";
import AgreementSection from "@/components/SignUpBox/AgreementSection";

const SignUpPage = () => {
  return (
    <S.LoginContainer>
      <S.LoginForm>
        <S.Logo>
          <LogoIcon width={143} height={55} />
        </S.Logo>
        <S.Title>회원가입</S.Title>
        <SignUpBox/>
        <AgreementSection/>
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