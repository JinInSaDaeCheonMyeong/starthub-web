import styled, { keyframes } from "styled-components";
import { StartHubColors } from "@/shared/design";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBox = styled.div<{
  width?: string;
  height?: string;
  mb?: string;
  level?: number;
}>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "16px"};
  margin-bottom: ${({ mb }) => mb || "0"};
  padding-left: ${({ level }) => (level ? `${16 + (level - 1) * 20}px` : "0")};
  background: linear-gradient(
    90deg,
    ${StartHubColors.Gray4} 25%,
    ${StartHubColors.Gray3} 37%,
    ${StartHubColors.Gray4} 63%
  );
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
  border-radius: 4px;
`;

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  padding: 50px 65px;
  margin-bottom: 150px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NoticeTitle = styled.div`
  border-bottom: 1px solid #dadada;
  padding-bottom: 24px;
  margin-bottom: 32px;

  .category {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 16px;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 24px;

  .heading {
    margin-bottom: 12px;
  }

  .lines {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const Sidebar = styled.aside`
  flex-shrink: 0;
  position: sticky;
  top: 170px;
  height: fit-content;
  padding: 24px;

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 13px;
    margin-bottom: 20px;
  }

  .toc {
    border-left: 2px solid ${StartHubColors.Black1};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin-bottom: 4px;
    }
  }
`;

const contentSections = [
  { heading: "60%", lines: ["100%", "95%", "88%", "70%"] },
  { heading: "45%", lines: ["100%", "90%", "85%"] },
  { heading: "55%", lines: ["100%", "92%", "87%", "75%"] },
  { heading: "40%", lines: ["100%", "96%", "82%"] },
  { heading: "50%", lines: ["100%", "94%", "89%", "76%", "83%"] },
];

const tocItems = [
  { level: 1, width: "80%" },
  { level: 1, width: "70%" },
  { level: 2, width: "85%" },
  { level: 2, width: "65%" },
  { level: 1, width: "75%" },
  { level: 2, width: "90%" },
  { level: 3, width: "60%" },
  { level: 1, width: "80%" },
];

const DetailSkeleton = () => {
  return (
    <Container>
      <MainContent>
        <NoticeTitle>
          <div className="category">
            <SkeletonBox width="20px" height="20px" />
            <SkeletonBox width="120px" height="24px" />
          </div>
          <SkeletonBox width="100%" height="36px" mb="20px" />
          <SkeletonBox width="300px" height="24px" />
        </NoticeTitle>

        {contentSections.map((section, index) => (
          <ContentSection key={index}>
            <div className="heading">
              <SkeletonBox
                width={section.heading}
                height={index === 0 || index === 4 ? "28px" : "24px"}
              />
            </div>
            <div className="lines">
              {section.lines.map((width, lineIndex) => (
                <SkeletonBox key={lineIndex} width={width} />
              ))}
            </div>
          </ContentSection>
        ))}
      </MainContent>

      <Sidebar>
        <div className="buttons">
          <SkeletonBox width="32px" height="33px" />
          <SkeletonBox width="32px" height="33px" />
        </div>

        <ul className="toc">
          {tocItems.map((item, index) => (
            <li key={index}>
              <SkeletonBox
                width={item.width}
                height="20px"
                level={item.level}
              />
            </li>
          ))}
        </ul>
      </Sidebar>
    </Container>
  );
};

export default DetailSkeleton;
