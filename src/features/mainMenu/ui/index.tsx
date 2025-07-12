import styled from "styled-components";
import { ReactComponent as BMCIcon } from "@assets/icons/bag.svg";
import { ReactComponent as ChartIcon } from "@assets/icons/chart.svg";
import { ReactComponent as RocketIcon } from "@assets/icons/rocketMenu.svg";
import { ReactComponent as HumanIcon } from "@assets/icons/human.svg";
import { ReactComponent as BuildingIcon } from "@assets/icons/building.svg";
import { StartHubColors, StartHubFont } from "@/shared/design";

const MainMenu = () => {
  const menuItems = [
    { icon: <BMCIcon />, label: "BMC 제작" },
    { icon: <ChartIcon />, label: "경쟁사 분석" },
    { icon: <RocketIcon />, label: "최신 공고 보러가기" },
    { icon: <HumanIcon />, label: "청년 맞춤 공고" },
    { icon: <BuildingIcon />, label: "창업 멤버 모집하기" },
  ];

  return (
    <MenuContainer>
      {menuItems.map((item, idx) => (
        <MenuButton key={idx} role="button" aria-label={item.label}>
          {item.icon}
          <p>{item.label}</p>
        </MenuButton>
      ))}
    </MenuContainer>
  );
};

export default MainMenu;


const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 44px;
  padding: 50px 0 100px;
`;

const MenuButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  svg {
    width: 70px;
    height: 70px;
  }

  p {
    margin-top: 8px;
    ${StartHubFont.Pretendard.Body2.Medium}
    color: ${StartHubColors.Gray2};
  }
`;
