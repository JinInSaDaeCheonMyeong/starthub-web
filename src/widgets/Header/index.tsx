import * as S from "./style";
import { ReactComponent as LogoIcon } from "@/assets/logo/logoIcon.svg";
import { StartHubButton } from "@/shared/ui/Button/index";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <S.HeaderContainer>
      <LogoIcon width={104} height={18} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <S.StyleLink to="/" $active={currentPath === "/"}>공고</S.StyleLink>
        <S.StyleLink to="/competitor" $active={currentPath === "/"}>경쟁사 분석</S.StyleLink>
        <S.StyleLink to="/recruit" $active={currentPath === "/"}>창업 멤버 모집</S.StyleLink>
        <S.StyleLink to="/bmc" $active={currentPath === "/"}>BMC 설계</S.StyleLink>
        <S.StyleLink to="/mypage" $active={currentPath === "/"}>마이페이지</S.StyleLink>
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
