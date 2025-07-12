import styled from "styled-components";
import { ReactComponent as BMCIcon } from "@assets/icons/bag.svg";
import { ReactComponent as ChartIcon } from "@assets/icons/chart.svg";
import { ReactComponent as RocketIcon } from "@assets/icons/rocketMenu.svg";
import { ReactComponent as HumanIcon } from "@assets/icons/human.svg";
import { ReactComponent as BuildingIcon } from "@assets/icons/building.svg";
import { ReactComponent as Members } from "@assets/icons/members.svg";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { useNavigate } from "react-router-dom";

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
    <MenuContainer>
      {menuItems.map((item, idx) => (
        <MenuButton
          key={idx}
          role="button"
          aria-label={item.label}
          onClick={() => navigate(item.path)}
        >
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
  padding: 40px 0 50px;
`;

const MenuButton = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${StartHubColors.Gray4};
    border-radius: 10px;
    p {
      color: ${StartHubColors.Black1};
    }
  }

  svg {
    width: 50px;
    height: 50px;
  }

  p {
    margin-top: 8px;
    ${StartHubFont.Pretendard.Body2.Medium}
    color: ${StartHubColors.Gray2};
  }
`;
