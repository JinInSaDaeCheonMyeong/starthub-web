import SignInBox from "@/features/auth/signIn/ui/SignInForm";
import { ReactComponent as SignInImage } from "@assets/images/signInImage.svg";

const SignInPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-hub-primary flex justify-center items-center">
        <SignInImage className="w-full h-full" />
      </div>

      <div className="w-1/2 flex relative justify-center items-center">
        <SignInBox />
      </div>
    </div>
  );
};

export default SignInPage;
