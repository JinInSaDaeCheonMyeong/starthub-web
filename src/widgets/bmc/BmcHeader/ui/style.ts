import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 78px;
  width: 100%;
  color: ${StartHubColors.Black1};
  background-color: ${StartHubColors.White1};
  border-bottom: 1px solid ${StartHubColors.Gray3};
  display: flex;
  align-items: center;
  padding-left: 65px;
  gap: 20px;

  @media (min-width: 1920px) {
    height: 98px;
    padding-left: 260px;
  }

  @media (max-width: 1440px) {
    padding-left: 50px;
  }

  @media (max-width: 1024px) {
    padding-left: 30px;
  }

  @media print {
    padding-left: 40px !important;
  }
`;

export const BmcTitle = styled.p`
  ${StartHubFont.Pretendard.Body2.Medium}
`;

export const BmcDate = styled.p`
  ${StartHubFont.Pretendard.Caption1.Regular}
`;
