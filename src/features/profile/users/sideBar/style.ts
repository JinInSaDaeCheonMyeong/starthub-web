import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  background-color: ${StartHubColors.White1};
  padding-top: 30px;
`;

export const SidebarItem = styled.button`
  background: none;
  border: none;
  text-align: left;
  margin: 0;
  padding-bottom: 20px;
  font: ${StartHubFont.Pretendard.Body2.Regular};
  cursor: pointer;
  color: ${StartHubColors.Gray2};
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;

  &.active {
    color: ${StartHubColors.Black1};
  }
`;

export const Divider = styled.hr`
  border-top: 1px solid ${StartHubColors.Gray3};
  width: 224px;
`;

export const LogOut = styled.button`
  background: none;
  border: none;
  text-align: left;
  margin: 0;
  padding-top: 20px;
  font: ${StartHubFont.Pretendard.Body2.Regular};
  cursor: pointer;
  color: ${StartHubColors.Error};
  font-weight: normal;
  box-sizing: border-box;
`;
