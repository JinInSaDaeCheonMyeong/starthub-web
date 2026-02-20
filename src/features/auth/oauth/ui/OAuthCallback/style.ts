import styled, { keyframes } from "styled-components";
import { StartHubColors } from "@/shared/design";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${StartHubColors.Primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Message = styled.p`
  font-size: 16px;
  color: ${StartHubColors.Gray2};
  text-align: center;
  margin: 0;
`;
