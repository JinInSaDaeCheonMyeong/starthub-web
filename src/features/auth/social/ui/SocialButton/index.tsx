import { Google, Naver, Apple } from "@/assets/icons";
import { StartHubButton } from "@/shared/ui";
import { useSocialSignIn } from "../../model/useSocialSignIn";

const SocialButton = () => {
  const { handleSocialSignIn: handleGoogleSignIn } = useSocialSignIn("google");
  const { handleSocialSignIn: handleNaverSignIn } = useSocialSignIn("naver");
  const { handleSocialSignIn: handleAppleSignIn } = useSocialSignIn("apple");

  return (
    <div className="w-full flex flex-col gap-[15px]">
      {/* Divider with text */}
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-hub-gray-3"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-[12px] text-hub-gray-3 font-pt-caption2-medium text-[12px]">
            소셜 계정으로 로그인
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex flex-col gap-[10px]">
        <StartHubButton
          icon={<Google className="w-[22px] h-[22px]" />}
          text="Google 계정으로 로그인"
          onClick={handleGoogleSignIn}
          backgroundColor="#FFFFFF"
          textTheme="#000000"
          hoverColor="#F5F5F5"
          className="
            w-[320px] h-[50px]
            font-pt-caption1-medium
            rounded-[10px]
            shadow-[inset_0_0_0_1px_#CFCFCF]
            hover:shadow-[inset_0_0_0_1px_#9B9B9B]
            transition-all
          "
        />

        <StartHubButton
          icon={<Naver className="w-[22px] h-[22px]" />}
          text="네이버 계정으로 로그인"
          onClick={handleNaverSignIn}
          backgroundColor="#03C75A"
          textTheme="#FFFFFF"
          hoverColor="#02B550"
          className="
            w-[320px] h-[50px]
            font-pt-caption1-medium
            rounded-[10px]
            border border-[#00BC00]
          "
        />

        <StartHubButton
          icon={<Apple className="w-[18px] h-[22px]" />}
          text="Apple 계정으로 로그인"
          onClick={handleAppleSignIn}
          backgroundColor="#000000"
          textTheme="#FFFFFF"
          hoverColor="#1F1F1F"
          className="
            w-[320px] h-[50px]
            font-pt-caption1-medium
            rounded-[10px]
          "
        />
      </div>
    </div>
  );
};

export default SocialButton;
