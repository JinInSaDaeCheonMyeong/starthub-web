import { ReactComponent as BMCIcon } from "@assets/icons/bag.svg";
import { ReactComponent as ChartIcon } from "@assets/icons/chart.svg";
import { ReactComponent as RocketIcon } from "@assets/icons/rocketMenu.svg";
import { ReactComponent as HumanIcon } from "@assets/icons/human.svg";
import { ReactComponent as BuildingIcon } from "@assets/icons/building.svg";
import { ReactComponent as Members } from "@assets/icons/members.svg";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const MainMenu = () => {
  const menuItems = [
    { icon: <BMCIcon />, label: "BMC 제작", path: "/bmc" },
    { icon: <ChartIcon />, label: "경쟁사 분석", path: "/competitor" },
    { icon: <RocketIcon />, label: "최신 공고 보러가기", path: "/notice" },
    { icon: <HumanIcon />, label: "청년 맞춤 공고", path: "/notice" },
    { icon: <Members />, label: "창업 멤버 모집하기", path: "team-building" },
    { icon: <BuildingIcon />, label: "기업 등록하기", path: "/my-business" },
  ];
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
          {item.icon}
          <p>{item.label}</p>
        </S.MenuButton>
      ))}
    </S.MenuContainer>
  );
};

export default MainMenu;