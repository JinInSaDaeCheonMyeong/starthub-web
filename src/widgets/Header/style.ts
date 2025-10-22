import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { Link } from "react-router-dom";

interface StyleLinkProps {
  $active?: boolean;
}

export const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  border-bottom: 1px solid ${StartHubColors.Gray3};
  height: 78px;
  background: rgb(255, 255, 255, 50%);
  backdrop-filter: blur(20px); 
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 1000;
  
  /* 모달 열릴 때 스크롤바 너비만큼 자동 보정 */
  padding-right: var(--scrollbar-width, 0px);
`;

export const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const StyleLink = styled(Link)<StyleLinkProps>`
  ${StartHubFont.Pretendard.Caption1.Regular}
  color: ${({ $active }) =>
    $active ? StartHubColors.Primary : StartHubColors.Gray1};
  margin-left: 40px;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${StartHubColors.Primary};
  }
`;

export const WelcomeContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    ${StartHubFont.Pretendard.Caption1.Regular}
    margin-right: 10px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;
