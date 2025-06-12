import * as S from "./style";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { StartHubButton } from "@/shared/ui";
import { ReactComponent as LogoIcon } from "@/assets/logo/Vector.svg";
import SignUpBox from "@/features/auth/signUp/ui/SignUpForm";
import AgreementSection from "@/features/auth/signUp/ui/SignUpForm/AgreementSection";


const SignUpPage = () => {
  return (
    <S.LoginContainer>
      <S.LoginForm>
        <S.Logo>
          <LogoIcon width={143} height={55} />
        </S.Logo>
        <h2>회원가입</h2>
        <SignUpBox />
        <AgreementSection />
        <StartHubButton
          text="회원가입"
          width={320}
          height={50}
          backgroundColor={StartHubColors.Primary}
          typography={StartHubFont.Pretendard.Body1.Medium}
          onClick={() => {}}
          textTheme={StartHubColors.White1}
          customStyle={{ marginTop: "20px" }}
          hover="#235FE0"
        />
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default SignUpPage;
