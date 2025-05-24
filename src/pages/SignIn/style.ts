import styled from "styled-components";
import { StartHubColors } from "@/design/color/StartHubColors";

export const LeftBoxField = styled.div`
  background-color: ${StartHubColors.Primary};
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightBoxField = styled.div`
  display: flex;
  position: relative;
  width: 45%;
  justify-content: center;
  align-items: center;
`;