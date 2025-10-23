import styled from 'styled-components';
import { StartHubColors, StartHubFont } from '@/shared/design';
import { BmcSectionConfig } from '@/entities/bmc/model/bmcTemplateConfig';
import { BmcTemplateType } from '@/entities/bmc/model/types';
import { createGlobalStyle } from 'styled-components';

export const PrintStyles = createGlobalStyle`
  @media print {
    @page {
      size: 1300px auto;
      margin: 0;
    }
    
    body {
      margin: 0;
      padding: 0;
      background: white;
      user-select: auto;
    }
    
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      page-break-inside: avoid;
    }
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  padding-top: 105px;
  padding-bottom: 150px;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 1920px) {
    max-width: 1920px;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 150px;
  }

  @media (max-width: 1440px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  @media (max-width: 1024px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  @media print {
    padding: 40px;
    max-height: none;
    min-height: auto;
    background: ${StartHubColors.White1};
    display: block;
  }
`;

export const BmcCanvasHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 20px auto;

  @media (min-width: 1920px) {
    max-width: 1400px;
    margin: 0 auto 20px auto;
  }

  @media (max-width: 1440px) {
    max-width: 1200px;
  }

  @media (max-width: 1024px) {
    max-width: 900px;
  }

  @media print {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    max-width: 1220px !important;
    width: 1220px !important;
    margin: 0 auto 20px auto !important;
    padding-left: 0 !important;
  }
`;;

export const BmcCanvasHeader = styled.p`
  ${StartHubFont.WantedSans.Title2};
  color: ${StartHubColors.Black1};
  margin: 0;

  span {
    ${StartHubFont.Pretendard.Body2.Medium};
    margin-left: 10px;
  }
`;

export const WaterMark = styled.p`
  ${StartHubFont.WantedSans.Body3};
  color: ${StartHubColors.Black1};

  span {
    color: ${StartHubColors.Primary};
  }
`;

export const BmcCanvas = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "key-partners key-activities value-proposition customer-relationships customer-segments"
    "key-partners key-resources value-proposition channels customer-segments"
    "cost-structure cost-structure revenue-streams revenue-streams revenue-streams";
  gap: 10px;
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  background: ${StartHubColors.White1};
  box-sizing: border-box;

  @media (min-width: 1920px) {
    max-width: 1400px;
    gap: 12px;
  }

  @media (max-width: 1440px) {
    max-width: 1200px;
  }

  @media (max-width: 1024px) {
    max-width: 900px;
    gap: 8px;
  }

  @media print {
    page-break-inside: avoid;
    max-width: 1220px;
    width: 1220px;
    margin: 0 auto;
    gap: 10px;
  }
`;

export const BmcSection = styled.div<{ $config: BmcSectionConfig; $templateType?: BmcTemplateType }>`
  grid-area: ${({ $config }) => $config.gridArea};
  background-color: ${StartHubColors.White1};
  border: 2px solid ${({ $config }) => $config.color};
  border-radius: 8px;
  padding: 14px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;

  @media print {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
`;

export const SectionIcon = styled.div<{
  $config: BmcSectionConfig;
  $templateType?: BmcTemplateType;
}>`
  font-size: 20px;
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
    
    path, rect, circle {
      fill: ${({ $templateType, $config }) => {
        switch ($templateType) {
          case "STARTHUB":
            return StartHubColors.Primary;
          case "STARTHUB_DARK":
            return StartHubColors.Gray1;
          case "SIMPLE":
            return StartHubColors.Black1;
          case "COLOR":
            return $config.color;
          default:
            return StartHubColors.Black1;
        }
      }} !important;
    }
  }
`;

export const SectionTitle = styled.p<{$config: BmcSectionConfig; $templateType?: BmcTemplateType;}>`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  ${StartHubFont.Pretendard.Body2.SemiBold}

  color: ${({ $templateType, $config }) => {
    switch ($templateType) {
      case "STARTHUB":
        return StartHubColors.Primary;
      case "STARTHUB_DARK":
        return StartHubColors.Gray1;
      case "SIMPLE":
        return StartHubColors.Black1;
      case "COLOR":
        return $config.color;
      default:
        return StartHubColors.Black1;
    }
  }};
`;

export const SectionContent = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: ${StartHubColors.Black1};
  white-space: pre-wrap;
  word-break: break-word;
  ${StartHubFont.Pretendard.Body2.Regular}
  user-select: text;
  cursor: text;
  
  &:empty::before {
    content: '내용이 없습니다.';
    color: ${StartHubColors.Gray2};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: auto;
  padding: 15px 20px 0;
  flex-wrap: wrap;

  @media (min-width: 1920px) {
    padding: 20px 20px 0;
  }

  @media (max-width: 1024px) {
    padding: 10px;
  }

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
  color: ${StartHubColors.Gray2};
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

export const BmcEditSection = styled.div<{
  $config: BmcSectionConfig;
  $templateType?: BmcTemplateType;
}>`
  grid-area: ${({ $config }) => $config.gridArea};
  background-color: ${StartHubColors.White1};
  border: 2px solid ${({ $config }) => $config.color};
  border-radius: 8px;
  padding: 16px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;

  @media print {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const EditableTextArea = styled.textarea`
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: ${StartHubColors.Black1};
  white-space: pre-wrap;
  word-break: break-word;
  ${StartHubFont.Pretendard.Body2.Regular}
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 4px;
  padding: 8px;
  resize: vertical;
  min-height: 100px;
  outline: none;
  
  &:focus {
    border-color: ${StartHubColors.Primary};
  }
  
  &::placeholder {
    color: ${StartHubColors.Gray2};
  }
`;