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
    // BoxContainer
    <div className="flex w-full h-[274px] gap-[19px] justify-center">
      {/* PinkBox */}
      <div className="w-[334px] h-full bg-[#fff1f7] text-[#ff71af] px-[30px] py-[80px] rounded-[20px]">
        {/* BoxContent */}
        <div className="font-ws-title2">
          BMC 설계하기
          <div className="font-pt-caption1-medium text-hub-black-1">
            AI가 내 아이템을 보고 BMC를 설계해줘요!
          </div>
          <span className="text-hub-gray-2 font-pt-body2-medium">
            내 BMC 보기
          </span>
        </div>
        <BoxButton
          $bgColor="#FF71AF"
          $hvColor="#e85c9c"
          onClick={() => router.push("/bmc")}
        >
          바로가기
        </BoxButton>
      </div>

      {/* Middle column */}
      <div>
        {/* GreenBox */}
        <div className="w-[334px] h-[190px] bg-[#eafbf0] text-[#64dd91] px-[30px] py-[40px] rounded-[20px]">
          <div className="font-ws-title2">
            경쟁사 분석
            <div className="font-pt-caption1-medium text-hub-black-1">
              AI가 내 아이템을 보고 시장조사를 해줘요!
            </div>
          </div>
          <BoxButton
            $bgColor="#64DD91"
            $hvColor="#4fc97d"
            onClick={() => router.push("/competitor")}
          >
            바로가기
          </BoxButton>
        </div>

        {/* BlueBox */}
        <div className="w-[334px] h-[70px] bg-[#e8f7ff] text-hub-primary rounded-[20px] mt-[14px] font-ws-body1 flex items-center justify-center">
          더 좋은 서비스를 경험해보세요!
        </div>
      </div>

      {/* PurpleBox */}
      <div>
        <div className="w-[334px] h-full bg-[#f6e8ff] text-[#d290fb] px-[30px] py-[80px] rounded-[20px]">
          <div className="font-ws-title2">
            공고 보기
            <div className="font-pt-caption1-medium text-hub-black-1">
              지금 업데이트되는 공고들을 확인해 보세요!
            </div>
            <span className="text-hub-gray-2 font-pt-body2-medium">
              내가 관심 있어 한 공고 보기
            </span>
          </div>
          <BoxButton
            $bgColor="#D290FB"
            $hvColor="#b875df"
            onClick={() => router.push("/notices")}
          >
            바로가기
          </BoxButton>
        </div>
      </div>
    </div>
  );
};

export default BoxMenu;
