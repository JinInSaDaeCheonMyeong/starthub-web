import styled, { keyframes } from "styled-components";
import { StartHubFont } from "@/shared/design/text/StartHubFont";
import { StartHubColors } from "@/shared/design/color/StartHubColors";

// 스켈레톤 애니메이션
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${StartHubColors.White1};
  padding: 2rem;
`;

export const Header = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid ${StartHubColors.Gray4};
`;

export const SkeletonTitle = styled.div`
  width: 300px;
  height: 2rem;
  background: linear-gradient(90deg, ${StartHubColors.Gray4} 25%, ${StartHubColors.Gray3} 50%, ${StartHubColors.Gray4} 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const SkeletonSubtitle = styled.div`
  width: 150px;
  height: 1rem;
  background: linear-gradient(90deg, ${StartHubColors.Gray4} 25%, ${StartHubColors.Gray3} 50%, ${StartHubColors.Gray4} 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 6px;
`;

export const BmcGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: minmax(200px, auto) minmax(150px, auto) minmax(120px, auto);
  gap: 1rem;
  margin-bottom: 3rem;

  /* BMC 레이아웃 정의 */
  & > div:nth-child(1) { grid-area: 1 / 1 / 3 / 2; } /* 핵심 파트너 */
  & > div:nth-child(2) { grid-area: 1 / 2 / 2 / 3; } /* 핵심 활동 */
  & > div:nth-child(3) { grid-area: 1 / 3 / 3 / 4; } /* 가치 제안 */
  & > div:nth-child(4) { grid-area: 1 / 4 / 2 / 5; } /* 고객 관계 */
  & > div:nth-child(5) { grid-area: 1 / 5 / 3 / 6; } /* 고객 세그먼트 */
  & > div:nth-child(6) { grid-area: 2 / 2 / 3 / 3; } /* 핵심 자원 */
  & > div:nth-child(7) { grid-area: 2 / 4 / 3 / 5; } /* 채널 */
  & > div:nth-child(8) { grid-area: 3 / 1 / 4 / 4; } /* 비용 구조 */
  & > div:nth-child(9) { grid-area: 3 / 4 / 4 / 6; } /* 수익 구조 */

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(9, auto);

    & > div {
      grid-area: auto !important;
    }
  }
`;

export const BmcSection = styled.div`
  border: 2px solid ${StartHubColors.Gray4};
  border-radius: 12px;
  padding: 1.5rem;
  background-color: ${StartHubColors.White1};
`;

export const SkeletonSectionTitle = styled.div`
  width: 60%;
  height: 1.5rem;
  background: linear-gradient(90deg, ${StartHubColors.Gray4} 25%, ${StartHubColors.Gray3} 50%, ${StartHubColors.Gray4} 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 6px;
  margin-bottom: 1rem;
`;

export const SkeletonContent = styled.div`
  width: ${() => Math.random() * 40 + 60}%;
  height: 1rem;
  background: linear-gradient(90deg, ${StartHubColors.Gray4} 25%, ${StartHubColors.Gray3} 50%, ${StartHubColors.Gray4} 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 4px;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const GeneratingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: ${StartHubColors.White1};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${StartHubColors.Gray4};
  border-top: 4px solid ${StartHubColors.Primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.5rem;
`;

export const MessageText = styled.div`
  ${StartHubFont.Pretendard.Headlines2};
  color: ${StartHubColors.Black1};
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const SubMessage = styled.div`
  ${StartHubFont.Pretendard.Body1};
  color: ${StartHubColors.Gray2};
  text-align: center;
`;