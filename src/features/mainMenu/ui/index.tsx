'use client'

import BMCIcon from "@assets/icons/bmc.png";
import AiIcon from "@assets/icons/ai.png";
import CardIcon from "@assets/icons/card.png";
import MapIcon from "@assets/icons/image.png";
import HeartIcon from "@assets/icons/heart.png";
import RivalIcon from "@assets/icons/rival.png";
import { useRouter } from "next/navigation";
import * as S from "./style";

const menuItems = [
  {
    icon: <img src={MapIcon.src} alt="지역 공고" />,
    label: "대구 지역 공고",
    path: "/notices/daegu",
  },
  {
    icon: <img src={CardIcon.src} alt="자금 분야 공고" />,
    label: "자금 분야 공고",
    path: "/notices/funding",
  },
  {
    icon: <img src={BMCIcon.src} alt="BMC 제작" />,
    label: "BMC 제작",
    path: "/bmc",
  },
  {
    icon: <img src={RivalIcon.src} alt="경쟁사 분석" />,
    label: "경쟁사 분석",
    path: "/competitor",
  },
  {
    icon: <img src={AiIcon.src} alt="AI 추천 공고" />,
    label: "AI 추천 공고",
    path: "/notices/recommend",
  },
  {
    icon: <img src={HeartIcon.src} alt="내 관심 공고" />,
    label: "내 관심 공고",
    path: "/like-list",
  },
];

const MainMenu = () => {
  const router = useRouter();

  return (
    <S.MenuContainer>
      {menuItems.map((item, idx) => (
        <S.MenuButton
          key={idx}
          role="button"
          aria-label={item.label}
          onClick={() => router.push(item.path)}
        >
          <div>{item.icon}</div>
          <p>{item.label}</p>
        </S.MenuButton>
      ))}
    </S.MenuContainer>
  );
};

export default MainMenu;
