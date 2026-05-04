import { Google, Naver, Apple } from "@/assets/icons";
import { StartHubButton } from "@/shared/ui";
import { useSocialSignIn } from "../../model/useSocialSignIn";

const SocialButton = () => {
  const { handleSocialSignIn: handleGoogleSignIn } = useSocialSignIn("google");
  const { handleSocialSignIn: handleNaverSignIn } = useSocialSignIn("naver");
  const { handleSocialSignIn: handleAppleSignIn } = useSocialSignIn("apple");

  return (
    <>
      <StartHubButton
        icon={<Google className="w-[18px] h-[18px]" />}
        text="Google로 로그인"
        onClick={handleGoogleSignIn}
        className="
          w-[320px] h-[50px]
          mb-[12px]
          bg-hub-white-1
          text-hub-black-1
          font-pt-caption1-medium
          shadow-[inset_0_0_0_1px_#CFCFCF]
          hover:bg-hub-white-2
        "
      />

      <StartHubButton
        icon={<Naver className="w-[16px] h-[16px]" />}
        text="네이버로 로그인"
        onClick={handleNaverSignIn}
        className="
          w-[320px] h-[50px]
          mb-[12px]
          bg-[#00C300]
          text-hub-white-1
          font-pt-caption1-medium
          shadow-[inset_0_0_0_1px_#00BC00]
          hover:bg-[#10BC10]
        "
      />

      <StartHubButton
        icon={<Apple className="w-[14px] h-[17px]" />}
        text="Apple로 로그인"
        onClick={handleAppleSignIn}
        className="
          w-[320px] h-[50px]
          bg-hub-black-1
          text-hub-white-1
          font-pt-caption1-medium
          shadow-[inset_0_0_0_1px_#000000]
          hover:bg-hub-black-2
        "
      />
    </>
  );
};

export default SocialButton;
