import * as S from "./style";
import { ReactComponent as LogoIcon } from "@/assets/logo/logoIcon.svg";
import { StartHubButton } from "@/shared/ui/Button/index";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";
import { ReactComponent as DefaultProfile } from "@assets/icons/profile.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { data, isError, error } = useGetMyProfile();

  const is401Error = isError && error?.response?.status === 401;
  const isAuthenticated = data && !is401Error;

  return (
    <S.HeaderContainer>
      <LogoIcon width={104} height={18} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <S.StyleLink to="/notices" $active={currentPath === "/notices"}>
          공고
        </S.StyleLink>
        <S.StyleLink to="/competitor" $active={currentPath === "/competitor"}>
          경쟁사 분석
        </S.StyleLink>
        <S.StyleLink
          to="/team-building"
          $active={currentPath === "/team-building"}
        >
          창업 멤버 모집
        </S.StyleLink>
        <S.StyleLink to="/bmc" $active={currentPath === "/bmc"}>
          BMC 설계
        </S.StyleLink>
        <S.StyleLink to="/my-business" $active={currentPath === "/my-business"}>
          My비지니스
        </S.StyleLink>
      </div>
      {isAuthenticated ? (
        <S.WelcomeContainer>
          <p>환영합니다. {data.username}님</p>
          {data.profileImage ? (
            <img
              src={data.profileImage}
              onClick={() => navigate("/my-profile")}
            />
          ) : (
            <DefaultProfile
              width={40}
              height={40}
              onClick={() => navigate("/my-profile")}
            />
          )}
        </S.WelcomeContainer>
      ) : (
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
      )}
    </S.HeaderContainer>
  );
};

export default Header;