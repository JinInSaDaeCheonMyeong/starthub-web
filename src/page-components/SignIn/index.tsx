import SignInBox from "@/features/auth/signIn/ui/SignInForm";
import { ReactComponent as SignInImage } from "@assets/images/signInImage.svg";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-hub-primary items-center justify-center relative overflow-hidden">
        <div className="relative w-full max-w-[640px] h-[724px]">
          <SignInImage className="w-full h-full" />
        </div>
      </div>

      {/* Right Section - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <SignInBox />
      </div>
    </div>
  );
};

export default SignInPage;
