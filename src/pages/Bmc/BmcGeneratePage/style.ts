import { StartHubColors } from "@/shared/design";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${StartHubColors.White2};
  overflow: hidden;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 78px;
  display: flex;
  background-color: ${StartHubColors.White2};
  gap: 55px;
  padding: 34px 0;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 78px);
  overflow: auto;
`;
