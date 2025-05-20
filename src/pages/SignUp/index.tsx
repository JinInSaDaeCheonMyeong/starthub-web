import * as S from './style';
import { StartHubButton } from '../../components/common/StartHubButton';
import { StartHubColors } from '../../Design/color/StartHubColors';
import { StartHubFont } from '../../Design/text/StartHubFont';

const SignUp = () => {
  return (
    <S.GlobalStyle>
      <S.Container>
        <StartHubButton
          text="회원가입"
          width={320}
          height={50}
          backgroundColor={StartHubColors.Primary}
          typography={StartHubFont.Pretendard.Body1.Medium}
          onClick={() => console.log("click!")}
          textTheme={StartHubColors.White1}
        />
      </S.Container>
    </S.GlobalStyle>
  )
}

export default SignUp;
