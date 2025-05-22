import * as S from "./style";
import SignIn from "../../components/SignInBox";
import { ReactComponent as SignInImage } from "../../assets/images/signInImage.svg";

const SignInPage = () => {
  return (
    <div className="signin" style={{ display: "flex", height: "100vh" }}>
      <S.LeftBoxField>
        <SignInImage style={{ width: "601px", height: "724px" }} />
      </S.LeftBoxField>
      <S.RightBoxField>
        <SignIn />
      </S.RightBoxField>
    </div>
  );
};

export default SignInPage;
