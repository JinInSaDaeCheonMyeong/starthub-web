import styled from 'styled-components';
import { StartHubColors, StartHubFont } from '@/shared/design';
import { ComponentType, SVGProps } from 'react';

interface BmcSectionConfig {
  id: string;
  title: string;
  icon:  string | ComponentType<SVGProps<SVGSVGElement> & { title?: string | undefined; }> | undefined;
  color: string;
  gridArea: string;
  order: number;
}

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${StartHubColors.White2};
  padding: 40px 20px;
`;

export const BmcCanvas = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "key-partners key-activities value-proposition customer-relationships customer-segments"
    "key-partners key-resources value-proposition channels customer-segments"
    "cost-structure cost-structure revenue-streams revenue-streams revenue-streams";
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border: 2px solid ${StartHubColors.White2};
  border-radius: 8px;

  @media print {
    page-break-inside: avoid;
  }
`;

export const BmcSection = styled.div<{ $config: BmcSectionConfig }>`
  grid-area: ${({ $config }) => $config.gridArea};
  background-color: ${({ $config }) => $config.color};
  border: 1px solid ${StartHubColors.White2};
  border-radius: 8px;
  padding: 16px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }

  @media print {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${StartHubColors.Gray2};
`;

export const SectionIcon = styled.span`
  font-size: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${StartHubColors.Gray1};
  margin: 0;
  ${StartHubFont.Pretendard.Body2.Medium}
`;

export const SectionContent = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: ${StartHubColors.Gray2};
  white-space: pre-wrap;
  word-break: break-word;
  ${StartHubFont.Pretendard.Body2.Regular}
  
  &:empty::before {
    content: '내용이 없습니다.';
    color: ${StartHubColors.Gray3};
    font-style: italic;
  }
`;

export const CanvasTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 12px 0;
  ${StartHubFont.WantedSans.Title1}
`;

export const CanvasSubtitle = styled.p`
  font-size: 20px;
  margin: 0;
  opacity: 0.95;
  ${StartHubFont.Pretendard.Body1.Regular}
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
`;

export const LoadingText = styled.div`
  font-size: 18px;
  color: ${StartHubColors.Gray3};
  ${StartHubFont.Pretendard.Body1.Regular}
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 24px;
`;

export const ErrorText = styled.div`
  font-size: 20px;
  color: ${StartHubColors.Error};
  ${StartHubFont.Pretendard.Body1.Medium}
`;
