"use client";

import { ReactComponent as LogoIcon } from "@/assets/logo/logoIcon.svg";
import { StartHubButton } from "@/shared/ui/Button/index";
import { useRouter, usePathname } from "next/navigation";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";
import { ReactComponent as DefaultProfile } from "@assets/icons/profile.svg";
import Link from "next/link";

const navLinks = [
  { href: "/notices", label: "공고" },
  { href: "/competitor", label: "경쟁사 분석" },
  { href: "/bmc", label: "BMC 설계" },
  { href: "/documents", label: "AI 문서 생성" },
  { href: "/chat", label: "Hub AI" },
  { href: "/my-profile", label: "My 비즈니스" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetMyProfile();

  return (
    <div className="fixed top-0 left-0 z-[1000] w-full">
      {/* 피드백 배너 */}
      <div className="w-full">
        <p className="font-pt-caption1-regular bg-hub-primary text-hub-white-1 text-center py-2">
          더 나은 스타트허브를 위해 피드백을 남겨주세요!{" "}
          <a
            href="https://forms.gle/CWkE5rztb6G5woDa9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-hub-white-1"
          >
            피드백 남기기
          </a>
        </p>
      </div>

      {/* 헤더 */}
      <header
        className="w-full border-b border-hub-gray-3 h-[78px] bg-white/50 backdrop-blur-xl flex items-center justify-center"
        style={{ paddingRight: "var(--scrollbar-width, 0px)" }}
      >
        <div className="w-full px-[200px] flex items-center justify-between h-full">
          {/* 로고 */}
          <Link
            href="/"
            aria-label="StartHub 홈으로 이동"
            className="cursor-pointer"
          >
            <LogoIcon width={104} height={18} />
          </Link>

          {/* 네비게이션 */}
          <div className="flex flex-row">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-pt-caption1-regular ml-10 whitespace-nowrap no-underline cursor-pointer hover:text-hub-primary ${
                  pathname === href ? "text-hub-primary" : "text-hub-gray-1"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* 유저 영역 */}
          {data ? (
            <div className="flex items-center">
              <p className="font-pt-caption1-regular mr-[10px]">
                환영합니다. {data.username}님
              </p>
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  onClick={() => router.push("/my-profile")}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              ) : (
                <DefaultProfile
                  width={40}
                  height={40}
                  onClick={() => router.push("/my-profile")}
                  className="cursor-pointer"
                />
              )}
            </div>
          ) : (
            <StartHubButton
              text="로그인"
              onClick={() => router.push("/sign-in")}
              height={36}
              className="font-pt-caption1-semibold !w-auto whitespace-nowrap"
            />
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
