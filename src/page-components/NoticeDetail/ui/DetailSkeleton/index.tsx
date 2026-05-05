// import styled, { keyframes } from "styled-components";
// import { StartHubColors } from "@/shared/design";

// const shimmer = keyframes`
//   0% {
//     background-position: -200px 0;
//   }
//   100% {
//     background-position: calc(200px + 100%) 0;
//   }
// `;

// const SkeletonBox = styled.div<{
//   width?: string;
//   height?: string;
//   mb?: string;
//   level?: number;
// }>`
//   width: ${({ width }) => width || "100%"};
//   height: ${({ height }) => height || "16px"};
//   margin-bottom: ${({ mb }) => mb || "0"};
//   padding-left: ${({ level }) => (level ? `${16 + (level - 1) * 20}px` : "0")};
//   background: linear-gradient(
//     90deg,
//     ${StartHubColors.Gray4} 25%,
//     ${StartHubColors.Gray3} 37%,
//     ${StartHubColors.Gray4} 63%
//   );
//   background-size: 400px 100%;
//   animation: ${shimmer} 1.4s ease-in-out infinite;
//   border-radius: 4px;
// `;

// const Container = styled.div`
//   display: flex;
//   max-width: 1200px;
//   width: 100%;
//   padding: 50px 65px;
//   margin-bottom: 150px;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 20px;
//   }
// `;

// const MainContent = styled.div`
//   flex: 1;
//   min-width: 0;
// `;

// const NoticeTitle = styled.div`
//   border-bottom: 1px solid #dadada;
//   padding-bottom: 24px;
//   margin-bottom: 32px;

//   .category {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     margin-bottom: 16px;
//   }
// `;

// const ContentSection = styled.div`
//   margin-bottom: 24px;

//   .heading {
//     margin-bottom: 12px;
//   }

//   .lines {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }
// `;

// const Sidebar = styled.aside`
//   flex-shrink: 0;
//   position: sticky;
//   top: 170px;
//   height: fit-content;
//   padding: 24px;

//   .buttons {
//     display: flex;
//     flex-direction: column;
//     gap: 13px;
//     margin-bottom: 20px;
//   }

//   .toc {
//     border-left: 2px solid ${StartHubColors.Black1};
//     padding: 0;
//     margin: 0;
//     list-style: none;

//     li {
//       margin-bottom: 4px;
//     }
//   }
// `;

// const contentSections = [
//   { heading: "60%", lines: ["100%", "95%", "88%", "70%"] },
//   { heading: "45%", lines: ["100%", "90%", "85%"] },
//   { heading: "55%", lines: ["100%", "92%", "87%", "75%"] },
//   { heading: "40%", lines: ["100%", "96%", "82%"] },
//   { heading: "50%", lines: ["100%", "94%", "89%", "76%", "83%"] },
// ];

// const tocItems = [
//   { level: 1, width: "80%" },
//   { level: 1, width: "70%" },
//   { level: 2, width: "85%" },
//   { level: 2, width: "65%" },
//   { level: 1, width: "75%" },
//   { level: 2, width: "90%" },
//   { level: 3, width: "60%" },
//   { level: 1, width: "80%" },
// ];

// const DetailSkeleton = () => {
//   return (
//     <Container>
//       <MainContent>
//         <NoticeTitle>
//           <div className="category">
//             <SkeletonBox width="20px" height="20px" />
//             <SkeletonBox width="120px" height="24px" />
//           </div>
//           <SkeletonBox width="100%" height="36px" mb="20px" />
//           <SkeletonBox width="300px" height="24px" />
//         </NoticeTitle>

//         {contentSections.map((section, index) => (
//           <ContentSection key={index}>
//             <div className="heading">
//               <SkeletonBox
//                 width={section.heading}
//                 height={index === 0 || index === 4 ? "28px" : "24px"}
//               />
//             </div>
//             <div className="lines">
//               {section.lines.map((width, lineIndex) => (
//                 <SkeletonBox key={lineIndex} width={width} />
//               ))}
//             </div>
//           </ContentSection>
//         ))}
//       </MainContent>

//       <Sidebar>
//         <div className="buttons">
//           <SkeletonBox width="32px" height="33px" />
//           <SkeletonBox width="32px" height="33px" />
//         </div>

//         <ul className="toc">
//           {tocItems.map((item, index) => (
//             <li key={index}>
//               <SkeletonBox
//                 width={item.width}
//                 height="20px"
//                 level={item.level}
//               />
//             </li>
//           ))}
//         </ul>
//       </Sidebar>
//     </Container>
//   );
// };

// export default DetailSkeleton;

export default function DetailSkeleton() {
  return (
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[150px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <div className="w-full">
          {/* Title Section Skeleton */}
          <div className="border-b border-[#dadada] pb-4 sm:pb-6 mb-6 sm:mb-8">
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              <div className="w-24 h-5 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              <div className="w-20 h-6 bg-hub-gray-3 rounded animate-skeleton-pulse" />
            </div>

            {/* Title with Like Button */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <div className="w-full h-8 bg-hub-gray-3 rounded animate-skeleton-pulse mb-2" />
                <div className="w-3/4 h-8 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
              <div className="w-8 h-8 bg-hub-gray-3 rounded animate-skeleton-pulse mt-1" />
            </div>

            {/* Reception Period */}
            <div className="w-64 h-5 bg-hub-gray-3 rounded animate-skeleton-pulse" />
          </div>

          {/* Content Sections Skeleton */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div>
              <div className="w-2/3 h-7 bg-hub-gray-3 rounded animate-skeleton-pulse mb-4" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-11/12 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-4/5 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-3/4 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <div className="w-1/2 h-6 bg-hub-gray-3 rounded animate-skeleton-pulse mb-4" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-5/6 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-4/5 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <div className="w-3/5 h-6 bg-hub-gray-3 rounded animate-skeleton-pulse mb-4" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-11/12 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-5/6 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-3/4 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-2/3 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <div className="w-2/5 h-6 bg-hub-gray-3 rounded animate-skeleton-pulse mb-4" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-10/12 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-4/5 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
