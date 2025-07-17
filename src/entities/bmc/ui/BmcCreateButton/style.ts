import { StartHubColors } from "@/shared/design";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  width: 282px;
  height: 173px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${StartHubColors.Primary};
    background-color: ${StartHubColors.White2};
  }
`;

export const PlusIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex; /* 이 부분이 빠져있었음 */
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
    fill: ${StartHubColors.Primary};
    transition: fill 0.3s ease;
  }
  
  ${ButtonContainer}:hover & svg {
    fill: ${StartHubColors.Primary};
  }
`;