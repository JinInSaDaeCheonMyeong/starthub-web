import BMCIcon from "@assets/icons/bmc.png";
import AiIcon from "@assets/icons/ai.png";
import CardIcon from "@assets/icons/card.png";
import MapIcon from "@assets/icons/image.png";
import HeartIcon from "@assets/icons/heart.png";
import RivalIcon from "@assets/icons/rival.png";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const menuItems = [
  {
    icon: <img src={MapIcon} alt="지역 공고" />,
    label: "대구 지역 공고",
    path: "/notices/daegu",
  },
  {
    icon: <img src={CardIcon} alt="자금 분야 공고" />,
    label: "자금 분야 공고",
    path: "/notices/funding",
  },
  {
    icon: <img src={BMCIcon} alt="BMC 제작" />,
    label: "BMC 제작",
    path: "/bmc",
  },
  {
    icon: <img src={RivalIcon} alt="경쟁사 분석" />,
    label: "경쟁사 분석",
    path: "/team-building",
  },
  {
    icon: <img src={AiIcon} alt="AI 추천 공고" />,
    label: "AI 추천 공고",
    path: "/notices/recommend",
  },
  {
    icon: <img src={HeartIcon} alt="내 관심 공고" />,
    label: "내 관심 공고",
    path: "/like-list",
  },
];

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <S.MenuContainer>
      {menuItems.map((item, idx) => (
        <S.MenuButton
          key={idx}
          role="button"
          aria-label={item.label}
          onClick={() => navigate(item.path)}
        >
          <div>{item.icon}</div>
          <p>{item.label}</p>
        </S.MenuButton>
      ))}
    </S.MenuContainer>
  );
};

export default MainMenu;
