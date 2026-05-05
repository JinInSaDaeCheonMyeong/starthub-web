"use client";

import React from "react";
import BMCIcon from "@assets/icons/bmc.png";
import AiIcon from "@assets/icons/ai.png";
import CardIcon from "@assets/icons/card.png";
import MapIcon from "@assets/icons/image.png";
import HeartIcon from "@assets/icons/heart.png";
import RivalIcon from "@assets/icons/rival.png";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    icon: <img src={MapIcon.src} alt="지역 공고" className="w-[78px] h-auto" />,
    label: "대구 지역\n공고",
    path: "/notices/daegu",
  },
  {
    icon: (
      <img
        src={CardIcon.src}
        alt="자금 분야 공고"
        className="w-[78px] h-auto"
      />
    ),
    label: "자금 분야\n공고",
    path: "/notices/funding",
  },
  {
    icon: <img src={BMCIcon.src} alt="BMC 제작" className="w-[78px] h-auto" />,
    label: "BMC 제작",
    path: "/bmc",
  },
  {
    icon: (
      <img src={RivalIcon.src} alt="경쟁사 분석" className="w-[78px] h-auto" />
    ),
    label: "경쟁사 분석",
    path: "/competitor",
  },
  {
    icon: (
      <img src={AiIcon.src} alt="AI 추천 공고" className="w-[78px] h-auto" />
    ),
    label: "AI 추천\n공고",
    path: "/notices/recommend",
  },
  {
    icon: (
      <img src={HeartIcon.src} alt="내 관심 공고" className="w-[78px] h-auto" />
    ),
    label: "내 관심\n공고",
    path: "/like-list",
  },
];

const MainMenu = () => {
  const router = useRouter();

  return (
    // MenuContainer
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 py-6 md:py-10 pb-8 md:pb-[50px] px-4">
      {menuItems.map((item, idx) => (
        // MenuButton
        <div
          key={idx}
          role="button"
          aria-label={item.label}
          onClick={() => router.push(item.path)}
          className="w-[90px] md:w-[104px] flex flex-col items-center cursor-pointer group"
        >
          <div className="w-[90px] md:w-[104px] h-[90px] md:h-[104px] flex items-center justify-center">
            {React.cloneElement(item.icon, {
              className: "w-[65px] md:w-[78px] h-auto"
            })}
          </div>
          <p className="mt-0.5 md:mt-1 font-pt-body2-regular text-xs md:text-sm text-hub-gray-2 group-hover:text-hub-black-1 text-center whitespace-pre-line md:whitespace-normal">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MainMenu;
