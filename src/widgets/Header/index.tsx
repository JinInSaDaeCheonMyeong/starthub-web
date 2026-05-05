"use client";

import { ReactComponent as LogoIcon } from "@/assets/logo/logoIcon.svg";
import { StartHubButton } from "@/shared/ui/Button/index";
import { useRouter, usePathname } from "next/navigation";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";
import { ReactComponent as DefaultProfile } from "@assets/icons/profile.svg";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/notices", label: "공고" },
  { href: "/competitor", label: "경쟁사 분석" },
  { href: "/bmc", label: "BMC 설계" },
  { href: "/chat", label: "Hub AI" },
  { href: "/my-profile", label: "My 비즈니스" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetMyProfile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-[1000] w-full">
        {/* 피드백 배너 - 모든 화면에서 표시 */}
        <div className="w-full">
          <p className="font-pt-caption1-regular bg-hub-primary text-hub-white-1 text-center py-2 text-xs lg:text-sm">
            더 나은 스타트허브를 위해 피드백을 남겨주세요!{" "}
            <a
              href="https://forms.gle/CWkE5rztb6G5woDa9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hub-white-1 underline"
            >
              피드백 남기기
            </a>
          </p>
        </div>

        {/* 헤더 */}
        <header
          className="w-full border-b border-hub-gray-3 h-[60px] md:h-[78px] bg-white"
          style={{ paddingRight: "var(--scrollbar-width, 0px)" }}
        >
          <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0 flex items-center justify-between h-full">
            {/* 로고 */}
            <Link
              href="/"
              aria-label="StartHub 홈으로 이동"
              className="cursor-pointer"
            >
              <LogoIcon width={100} height={18} className="md:w-[130px] md:h-[22px]" />
            </Link>

            {/* 데스크톱 네비게이션 */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 4).map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`font-pt-caption1-regular whitespace-nowrap no-underline cursor-pointer hover:text-hub-primary transition-colors ${
                    pathname === href ? "text-hub-primary" : "text-hub-gray-1"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* 유저 영역 */}
            <div className="flex items-center gap-2">
              {data ? (
                <div className="hidden md:flex items-center gap-2">
                  <p className="font-pt-caption1-regular text-xs lg:text-sm text-hub-gray-1">
                    환영합니다. {data.username}님
                  </p>
                  {data.profileImage ? (
                    <img
                      src={data.profileImage}
                      onClick={() => router.push("/my-profile")}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full cursor-pointer"
                    />
                  ) : (
                    <DefaultProfile
                      width={32}
                      height={32}
                      onClick={() => router.push("/my-profile")}
                      className="cursor-pointer lg:w-10 lg:h-10"
                    />
                  )}
                </div>
              ) : (
                <div
                  onClick={() => router.push("/sign-in")}
                  className="bg-hub-primary flex items-center justify-center h-[32px] w-[80px] md:h-[36px] md:w-[100px] px-3 py-2 rounded-[7px] cursor-pointer hover:bg-[#235FE0] transition-colors"
                >
                  <p className="font-pt-caption1-semibold text-xs md:text-sm text-center text-white whitespace-nowrap">
                    로그인
                  </p>
                </div>
              )}

              {/* 햄버거 메뉴 버튼 (모바일/태블릿) */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 ml-2"
                aria-label="메뉴 열기/닫기"
              >
                <span
                  className={`h-0.5 w-6 bg-hub-gray-1 transition-transform duration-200 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-6 bg-hub-gray-1 transition-opacity duration-200 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-0.5 w-6 bg-hub-gray-1 transition-transform duration-200 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </header>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-hub-gray-3 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-pt-caption1-regular py-2 px-3 rounded-lg transition-colors ${
                  pathname === href
                    ? "text-hub-primary bg-blue-50"
                    : "text-hub-gray-1 hover:text-hub-primary hover:bg-gray-50"
                }`}
              >
                {label}
              </Link>
            ))}

            {data && (
              <div className="pt-3 border-t border-hub-gray-4">
                <div className="flex items-center space-x-3 py-2 px-3">
                  {data.profileImage ? (
                    <img
                      src={data.profileImage}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <DefaultProfile width={32} height={32} />
                  )}
                  <span className="text-sm text-hub-gray-1">
                    {data.username}님
                  </span>
                </div>
                <Link
                  href="/my-profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 text-hub-gray-1 hover:text-hub-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  마이페이지
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      </div>

      {/* 모바일 메뉴 열렸을 때 배경 블러 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
