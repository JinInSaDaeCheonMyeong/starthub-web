import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { Link } from "react-router-dom";

interface StyleLinkProps {
  $active?: boolean;
}

export const HeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${StartHubColors.Gray3};
  height: 78px;
  background-color: ${StartHubColors.White1};
  padding: 0 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyleLink = styled(Link)<StyleLinkProps>`
  ${StartHubFont.Pretendard.Caption1.Regular}
  color: ${({ $active }) => ($active ? StartHubColors.Primary : StartHubColors.Gray2)};
  margin-left: 40px;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${StartHubColors.Primary};
  }
`;
