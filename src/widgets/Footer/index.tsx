import { ReactComponent as Email } from "@assets/icons/email.svg";
import { ReactComponent as Call } from "@assets/icons/call.svg";
import { ReactComponent as Location } from "@assets/icons/location.svg";

const Footer = () => {
  return (
    <div className="w-full bg-hub-white-2 border-t border-[#e5e5e5] select-text">
      <div className="max-w-[1200px] mx-auto px-5 pt-10 pb-5">

        {/* 상단 */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-10 md:gap-[40px] mb-10">

          {/* 로고 + 설명 */}
          <div className="flex flex-col gap-3">
            <div className="font-ws-title1">
              Start<span className="text-hub-primary font-ws-title1">Hub</span>
            </div>
            <p className="font-pt-caption1-regular text-hub-gray-2 leading-relaxed m-0">
              창업가들을 위한 최고의 플랫폼
              <br />
              아이디어부터 성공까지 함께합니다
            </p>
          </div>

          {/* 링크 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="font-pt-body2-semibold text-hub-black-1 m-0 mb-3">고객지원</h4>
              <a
                href="https://forms.gle/CWkE5rztb6G5woDa9"
                target="_blank"
                rel="noopener noreferrer"
                className="font-pt-caption1-regular text-hub-gray-2 no-underline cursor-pointer hover:text-hub-primary transition-colors duration-200"
              >
                1:1 문의
              </a>
            </div>
          </div>

          {/* 연락처 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-pt-body2-semibold text-hub-black-1 m-0 mb-3">연락처</h4>
            <div className="flex flex-col gap-2 mb-4">
              {[
                { icon: <Email className="w-[14px] h-[14px] mr-[3px]" />, text: "support@start-hub.kr" },
                { icon: <Call className="w-[14px] h-[14px] mr-[3px]" />,  text: "02-1234-5678" },
                { icon: <Location className="w-[14px] h-[14px] mr-[3px]" />, text: "대구광역시 달성군 구지면 창리로11길 93" },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="font-pt-caption1-regular text-hub-gray-2 leading-[1.4] flex items-center"
                >
                  {icon}
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="border-t border-[#e5e5e5] pt-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div className="flex flex-col gap-1 text-right md:text-left">
            <span className="font-pt-caption2-regular text-hub-gray-2">(주)스타트허브</span>
            <span className="font-pt-caption2-regular text-hub-gray-2">
              © 2025 StartHub. All rights reserved. made by 盡人事待天命
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;