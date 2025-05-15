import './style';
import SignIn from '../../components/SignIn';
import { LeftBoxField, RightBoxField } from './style';
import { ReactComponent as SignInImage } from "../../assets/images/signInImage.svg";

const SignInPage = () => {
  return (
    <div className="signin" style={{ display: "flex", height: "100vh" }}>
      <LeftBoxField>
        <SignInImage style={{width:"601px", height:"724px"}}/>
      </LeftBoxField>
      <RightBoxField>
        <SignIn/>
      </RightBoxField>
    </div>
  )
}

export default SignInPage;