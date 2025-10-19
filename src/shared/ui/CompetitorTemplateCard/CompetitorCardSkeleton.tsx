import styled from "styled-components";
import { StartHubColors } from "@/shared/design";
import * as S from "./style";

const SkeletonBox = styled.div`
  background-color: ${StartHubColors.Gray4};
  border-radius: 10px;
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

const SkeletonImageWrapper = styled(SkeletonBox)`
  width: 242px;
  height: 168px;
  border: 1px solid ${StartHubColors.Gray3};
`;

const SkeletonTitle = styled(SkeletonBox)`
  width: 120px;
  height: 16px;
  margin: 5px;
  margin-left: -1px;
`;

const SkeletonDate = styled(SkeletonBox)`
  width: 80px;
  height: 12px;
  margin: 0;
`;

export const CompetitorCardSkeleton = () => {
  return (
    <S.Container>
      <S.MainContent>
        <S.TitleSection>
          <S.Title>경쟁사분석 기능을 사용해보세요!</S.Title>
        </S.TitleSection>

        <S.CardRow>
          {[...Array(4)].map((_, index) => (
            <S.BmcImageContainer key={index} style={{ cursor: 'default' }}>
              <SkeletonImageWrapper />
              <SkeletonTitle />
              <SkeletonDate />
            </S.BmcImageContainer>
          ))}
        </S.CardRow>
      </S.MainContent>
    </S.Container>
  );
};
