import styled from "styled-components";
import { StartHubColors } from "@/shared/design";

const SkeletonBox = styled.div`
  width: 250px;
  height: 150px;
  background-color: ${StartHubColors.White1};
  border: 2px solid ${StartHubColors.Gray4};
  border-radius: 14px;
  margin-right: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  padding: 30px 19px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: ${StartHubColors.Gray4};
    }
    50% {
      background-color: ${StartHubColors.Gray3};
    }
    100% {
      background-color: ${StartHubColors.Gray4};
    }
  }
`;

export const NoticeSkeleton = () => {
  return <SkeletonBox />;
};
