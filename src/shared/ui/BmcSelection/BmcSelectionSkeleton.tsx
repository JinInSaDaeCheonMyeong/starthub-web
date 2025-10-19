import styled from "styled-components";
import { StartHubColors } from "@/shared/design";
import * as S from "./style";

const SkeletonBox = styled.div`
  background-color: ${StartHubColors.Gray4};
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

const SkeletonImage = styled(SkeletonBox)`
  width: 242px;
  height: 170px;
  border-radius: 10px;
  border: 1px solid ${StartHubColors.Gray3};
`;

const SkeletonTitle = styled(SkeletonBox)`
  width: 150px;
  height: 16px;
  margin-top: 8px;
  border-radius: 4px;
`;

const SkeletonDate = styled(SkeletonBox)`
  width: 100px;
  height: 12px;
  margin-top: 4px;
  border-radius: 4px;
`;

const SkeletonCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BmcSelectionSkeleton = () => {
  return (
    <S.Container>
      <S.Text>먼저 원하는 BMC를 선택해 주세요.</S.Text>
      <S.BmcTemplateContainer>
        {[...Array(4)].map((_, index) => (
          <SkeletonCardWrapper key={index}>
            <SkeletonImage />
            <SkeletonTitle />
            <SkeletonDate />
          </SkeletonCardWrapper>
        ))}
      </S.BmcTemplateContainer>
    </S.Container>
  );
};
