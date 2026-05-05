"use client";

import { useRouter } from "next/navigation";

type BoxButtonProps = {
  $bgColor?: string;
  $hvColor?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const BoxButton = ({
  $bgColor,
  $hvColor,
  onClick,
  children,
}: BoxButtonProps) => (
  <button
    onClick={onClick}
    className="w-[100px] h-[40px] text-white font-ws-body2 flex justify-center items-center rounded-[10px] mt-3 cursor-pointer transition-colors"
    style={{ backgroundColor: $bgColor }}
    onMouseEnter={(e) => {
      if ($hvColor)
        (e.currentTarget as HTMLElement).style.backgroundColor = $hvColor;
    }}
    onMouseLeave={(e) => {
      if ($bgColor)
        (e.currentTarget as HTMLElement).style.backgroundColor = $bgColor;
    }}
  >
    {children}
  </button>
);

const BoxMenu = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-[19px] justify-center">
      {/* BMC 설계하기 */}
      <div className="w-full lg:w-[334px] h-[274px] bg-[#fff1f7] rounded-[20px] flex flex-col items-center justify-center px-[50px] py-[30px]">
        <div className="flex flex-col gap-[16px] items-start w-[255px]">
          <div className="flex flex-col gap-[4px] items-start text-[#ff71af] w-full">
            <p className="font-ws-title2 text-[24px] font-bold leading-[1.2] tracking-[-0.096px] w-full">
              BMC 설계하기
            </p>
            <p className="font-pt-caption1-medium text-[14px] leading-[normal] w-full">
              AI가 내 아이템을 보고 BMC를 설계해줘요!
            </p>
          </div>
          <p className="font-pt-body2-medium text-[16px] leading-[normal] text-hub-gray-2 min-w-full w-[min-content]">
            내 BMC 보기
          </p>
          <div
            onClick={() => router.push("/bmc")}
            className="bg-[#ff71af] flex h-[40px] items-center justify-center px-[33px] py-[15px] rounded-[10px] w-[100px] cursor-pointer hover:bg-[#e85c9c] transition-colors"
          >
            <p className="font-ws-body2 text-[16px] leading-[1.4] font-medium text-center text-white tracking-[-0.064px] whitespace-nowrap">
              바로가기
            </p>
          </div>
        </div>
      </div>

      {/* 가운데 컬럼 */}
      <div className="flex flex-col gap-[14px] items-start w-full lg:w-[334px] lg:h-[274px] lg:justify-between">
        {/* 경쟁사 분석 */}
        <div className="bg-[#eafbf0] flex flex-col h-[190px] items-center justify-center px-[50px] py-[20px] rounded-[20px] w-full">
          <div className="flex flex-col gap-[12px] items-start w-[255px]">
            <div className="flex flex-col gap-[6px] items-start text-[#64dd91] w-full">
              <p className="font-ws-title2 text-[24px] font-bold leading-[1.2] tracking-[-0.096px] w-full">
                경쟁사 분석
              </p>
              <p className="font-pt-caption1-medium text-[14px] font-medium leading-[normal] w-full">
                AI가 내 아이템을 보고 시장조사를 해줘요!
              </p>
            </div>
            <div
              onClick={() => router.push("/competitor")}
              className="bg-[#64dd91] flex h-[40px] items-center justify-center px-[33px] py-[15px] rounded-[10px] w-[100px] cursor-pointer hover:bg-[#4fc97d] transition-colors"
            >
              <p className="font-ws-body2 text-[16px] leading-[1.4] font-medium text-center text-white tracking-[-0.064px] whitespace-nowrap">
                바로가기
              </p>
            </div>
          </div>
        </div>

        {/* 더 좋은 서비스 */}
        <div className="bg-[#e8f7ff] flex h-[70px] items-center justify-center px-[44px] py-[45px] rounded-[20px] w-full">
          <p className="font-ws-body1 text-[18px] leading-[1.2] font-semibold text-hub-primary tracking-[-0.072px] whitespace-nowrap">
            더 좋은 서비스를 경험해보세요!
          </p>
        </div>
      </div>

      {/* 공고 보기 */}
      <div className="w-full lg:w-[334px] h-[274px] bg-[#f6e8ff] rounded-[20px] flex flex-col items-center justify-center px-[50px] py-[30px]">
        <div className="flex flex-col gap-[16px] items-start w-[255px]">
          <div className="flex flex-col gap-[4px] items-start text-[#d290fb] w-full">
            <p className="font-ws-title2 text-[24px] font-bold leading-[1.2] tracking-[-0.096px] w-full">
              공고 보기
            </p>
            <p className="font-pt-caption1-medium text-[14px] leading-[normal] w-full">
              지금 업데이트되는 공고들을 확인해 보세요!
            </p>
          </div>
          <p className="font-pt-body2-medium text-[16px] leading-[normal] text-hub-gray-2 min-w-full w-[min-content]">
            내가 관심있어한 공고 보기
          </p>
          <div
            onClick={() => router.push("/notices")}
            className="bg-[#d290fb] flex h-[40px] items-center justify-center px-[33px] py-[15px] rounded-[10px] w-[100px] cursor-pointer hover:bg-[#b875df] transition-colors"
          >
            <p className="font-ws-body2 text-[16px] leading-[1.4] font-medium text-center text-white tracking-[-0.064px] whitespace-nowrap">
              바로가기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxMenu;
