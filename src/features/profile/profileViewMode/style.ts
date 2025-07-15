import styled from 'styled-components';
import { StartHubColors, StartHubFont } from '@/shared/design';

export const ProfileFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 32px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${StartHubColors.Gray4};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.div`
  font: ${StartHubFont.Pretendard.Body1.SemiBold};
  color: ${StartHubColors.Black1};
`;

export const InfoValue = styled.div`
  font: ${StartHubFont.Pretendard.Body2.Regular};
  color: ${StartHubColors.Gray1};
`;