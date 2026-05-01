'use client'

import * as S from "./style";
import { ReactComponent as LogoIcon } from "@/assets/logo/logoIcon.svg";
import { StartHubButton } from "@/shared/ui/Button/index";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { useRouter, usePathname } from "next/navigation";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";
import { ReactComponent as DefaultProfile } from "@assets/icons/profile.svg";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname;
  const { data } = useGetMyProfile();

  return (
    <S.HeadersContainer>
      <S.FeedbackFormHeaderContainer>
        <S.FeedbackFormWrapper>
          더 나은 스타트허브를 위해 피드백을 남겨주세요!{" "}
          <S.FeedbackFormLink
            href="https://forms.gle/CWkE5rztb6G5woDa9"
            target="_blank"
            rel="noopener noreferrer"
          >
            피드백 남기기
          </S.FeedbackFormLink>
        </S.FeedbackFormWrapper>
      </S.FeedbackFormHeaderContainer>
      <S.HeaderContainer>
        <S.ContentWrapper>
          <LogoIcon
            width={104}
            height={18}
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <S.StyleLink href="/notices" $active={currentPath === "/notices"}>
              공고
            </S.StyleLink>
            <S.StyleLink
              href="/competitor"
              $active={currentPath === "/competitor"}
            >
              경쟁사 분석
            </S.StyleLink>
            <S.StyleLink href="/bmc" $active={currentPath === "/bmc"}>
              BMC 설계
            </S.StyleLink>
            <S.StyleLink href="/chat" $active={currentPath === "/chat"}>
              Hub AI
            </S.StyleLink>
            <S.StyleLink
              href="/my-profile"
              $active={currentPath === "/my-profile"}
            >
              My 비즈니스
            </S.StyleLink>
          </div>
          {data ? (
            <S.WelcomeContainer>
              <p>환영합니다. {data.username}님</p>
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  onClick={() => router.push("/my-profile")}
                />
              ) : (
                <DefaultProfile
                  width={40}
                  height={40}
                  onClick={() => router.push("/my-profile")}
                />
              )}
            </S.WelcomeContainer>
          ) : (
            <StartHubButton
              text="로그인"
              backgroundColor={StartHubColors.Primary}
              onClick={() => {
                router.push("/sign-in");
              }}
              customStyle={{ width: "10%", whiteSpace: "nowrap" }}
              height={36}
              textTheme={StartHubColors.White1}
              typography={StartHubFont.Pretendard.Caption1.SemiBold}
            />
          )}
        </S.ContentWrapper>
      </S.HeaderContainer>
    </S.HeadersContainer>
  );
};

export default Header;
