import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { Link } from "react-router-dom";

interface StyleLinkProps {
  $active?: boolean;
}

export const HeadersContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${StartHubColors.Gray3};
  height: 78px;
  background: rgb(255, 255, 255, 50%);
  backdrop-filter: blur(20px); 
  display: flex;
  align-items: center;
  justify-content: center;
  
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

export const FeedbackFormHeaderContainer = styled.div`
  width: 100%;
`;

export const FeedbackFormWrapper = styled.p`
  ${StartHubFont.Pretendard.Caption1.Regular}
  background-color: ${StartHubColors.Primary};
  color: ${StartHubColors.White1};
  text-align: center;
  align-items: center;
  padding: 8px 0 8px 0;
`;

export const FeedbackFormLink = styled.a`
  color: ${StartHubColors.White1};
`;