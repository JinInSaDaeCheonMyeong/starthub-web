import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";

export const Sidebar = styled.aside`
  position: sticky;
  top: 60px;
  width: 180px;
  border-left: 1px solid ${StartHubColors.Gray3};
  border-right: 1px solid ${StartHubColors.Gray3};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  background-color: ${StartHubColors.White1};
  padding-top: 40px;
`;

export const SidebarItem = styled.button`
  background: none;
  border: none;
  text-align: left;
  margin: 0;
  padding: 10px 45px;
  font: ${StartHubFont.Pretendard.Body2.Medium};
  cursor: pointer;
  color: ${StartHubColors.Gray2};
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;

  &.active {
    color: ${StartHubColors.Black1};
    font-weight: bold;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${StartHubColors.Gray3};
  margin: 20px 0 20px 45px;
  width: calc(100% - 75px);
`;

export const LogOut = styled.button`
  background: none;
  border: none;
  text-align: left;
  margin: 0;
  padding: 10px 45px;
  font: ${StartHubFont.Pretendard.Body2.Medium};
  cursor: pointer;
  color: ${StartHubColors.Gray3};
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;
`;
