import styled from "styled-components";
import { StartHubColors } from "@/shared/design";

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 200px;
  padding-right: 200px;
  width: 100%;
  box-sizing: border-box;
`;

const SkeletonTitle = styled.div`
  width: 200px;
  height: 32px;
  background-color: ${StartHubColors.Gray4};
  border-radius: 8px;
  margin-bottom: 40px;
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

const SkeletonContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  max-width: 1400px;
`;

const SkeletonMainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SkeletonSection = styled.div`
  max-width: 700px;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const SkeletonSectionTitle = styled.div`
  width: 150px;
  height: 24px;
  background-color: ${StartHubColors.Gray4};
  border-radius: 6px;
  margin-bottom: 20px;
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

const SkeletonBox = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${StartHubColors.Gray4};
  border-radius: 10px;
  margin-bottom: 10px;
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

const SkeletonCompetitorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  width: 700px;
  margin-bottom: 20px;
`;

const SkeletonCompetitorCard = styled.div`
  width: 340px;
  height: 300px;
  padding: 20px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 8px;
  box-sizing: border-box;
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

const SkeletonDivider = styled.div`
  width: 700px;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: ${StartHubColors.Gray3};
  align-self: flex-start;
`;

const SkeletonInsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-bottom: 30px;
`;

const SkeletonInsightCard = styled.div`
  height: 200px;
  padding: 24px;
  border-radius: 10px;
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

const SkeletonSidebar = styled.div`
  position: sticky;
  top: 20px;
  width: 300px;
  flex-shrink: 0;
  height: 500px;
  padding: 20px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 10px;
  background-color: ${StartHubColors.Gray4};
  align-self: flex-start;
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

export const MarketAnalysisSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonTitle />

      <SkeletonContentWrapper>
        <SkeletonMainContent>
          {/* User Scale Section */}
          <SkeletonSection>
            <SkeletonSectionTitle />
            <SkeletonBox />
            <SkeletonBox />
            <SkeletonBox />
          </SkeletonSection>

          {/* Competitor Section */}
          <SkeletonSection>
            <SkeletonSectionTitle />
            <SkeletonCompetitorGrid>
              <SkeletonCompetitorCard />
              <SkeletonCompetitorCard />
            </SkeletonCompetitorGrid>
            <SkeletonCompetitorGrid>
              <SkeletonCompetitorCard />
              <SkeletonCompetitorCard />
            </SkeletonCompetitorGrid>
          </SkeletonSection>

          <SkeletonDivider />

          {/* Insight Section */}
          <SkeletonSection>
            <SkeletonSectionTitle />
            <SkeletonInsightGrid>
              <SkeletonInsightCard />
              <SkeletonInsightCard />
            </SkeletonInsightGrid>
          </SkeletonSection>

          <SkeletonDivider />

          {/* Global Expansion Section */}
          <SkeletonSection>
            <SkeletonSectionTitle />
            <SkeletonBox />
            <SkeletonBox />
          </SkeletonSection>
        </SkeletonMainContent>

        {/* BMC Sidebar */}
        <SkeletonSidebar />
      </SkeletonContentWrapper>
    </SkeletonContainer>
  );
};
