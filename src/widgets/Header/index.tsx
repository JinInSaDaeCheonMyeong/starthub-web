import * as S from "./style";
import { ReactComponent as LogoIcon } from "@/assets/logo/logoIcon.svg";
import { StartHubButton } from "@/shared/ui/Button/index";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <S.HeaderContainer>
      <LogoIcon width={104} height={18} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <S.StyleLink to="/">공고</S.StyleLink>
        <S.StyleLink to="/">경쟁사 분석</S.StyleLink>
        <S.StyleLink to="/">창업 멤버 모집</S.StyleLink>
        <S.StyleLink to="/">BMC 설계</S.StyleLink>
        <S.StyleLink to="/">마이페이지</S.StyleLink>
      </div>


      <StartHubButton
        text="로그인"
        backgroundColor={StartHubColors.Primary}
        onClick={() => {
          navigate("/sign-in");
        }}
        customStyle={{ width: "10%", whiteSpace: "nowrap" }}
        height={36}
        textTheme={StartHubColors.White1}
        typography={StartHubFont.Pretendard.Caption1.SemiBold}
      />
    </S.HeaderContainer>
  );
};

export default Header;
