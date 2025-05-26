import { StartHubColors, StartHubFont } from "@/design"
import { Google, Naver, Apple } from "@/assets/icons"
import { StartHubButton } from "@components/common"

const SocialButton = () =>{
    return(
        <>
        <StartHubButton
          icon={<Google style={{ width: "18px", height: "18px" }} />}
          text="Google로 로그인"
          backgroundColor={StartHubColors.White1}
          onClick={() => {}}
          typography={StartHubFont.Pretendard.Caption1.Medium}
          width={320}
          height={50}
          textTheme={StartHubColors.Black1}
          customStyle={{
            boxShadow: `0 0 0 1px ${StartHubColors.Gray3} inset`,
            marginBottom: "12px",
          }}
          hover={StartHubColors.White2}
      />

      <StartHubButton
        icon={<Naver style={{ width: "16px", height: "16px" }} />}
        text="네이버로 로그인"
        backgroundColor="#00C300"
        onClick={() => {}}
        typography={StartHubFont.Pretendard.Caption1.Medium}
        width={320}
        height={50}
        textTheme={StartHubColors.White1}
        customStyle={{
          boxShadow: `0 0 0 1px #00BC00 inset`,
          marginBottom: "12px",
        }}
        hover="#10BC10"
      />

      <StartHubButton
        icon={<Apple style={{ width: "14px", height: "17px" }} />}
        text="Apple로 로그인"
        backgroundColor={StartHubColors.Black1}
        onClick={() => {}}
        typography={StartHubFont.Pretendard.Caption1.Medium}
        width={320}
        height={50}
        textTheme={StartHubColors.White1}
        customStyle={{ boxShadow: `0 0 0 1px ${StartHubColors.Black1} inset` }}
        hover={StartHubColors.Black2}
      />
        </>
    )
}
export default SocialButton