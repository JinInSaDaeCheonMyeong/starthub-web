import styled from 'styled-components';
import { StartHubColors } from '@/shared/design';

export const ViewContainer = styled.div`
  margin-bottom: 20px;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 12px 0;
  border-bottom: 1px solid ${StartHubColors.Gray4};
`;

export const InfoLabel = styled.div`
  min-width: 120px;
  font-size: 14px;
  font-weight: 600;
  color: ${StartHubColors.Gray1};
`;

export const InfoValue = styled.div`
  flex: 1;
  font-size: 14px;
  color: ${StartHubColors.Black1};
  line-height: 1.4;
  word-break: break-word;

  a {
    color: ${StartHubColors.Primary};
    text-decoration: none;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;