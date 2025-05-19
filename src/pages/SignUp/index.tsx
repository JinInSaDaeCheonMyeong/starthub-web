import { StartHubButton } from '../../components/common/StartHubButton';
import * as S from './style';

const SignUp = () => {
  return (
    <div>
      <S.Container>
        <StartHubButton text = "테스트" backgroundColor='tomato' onClick={() => console.log('click')}></StartHubButton>
      </S.Container>
    </div>
  )
}

export default SignUp;
