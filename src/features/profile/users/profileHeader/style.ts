import styled from 'styled-components';
import { StartHubColors, StartHubFont } from '@/shared/design';

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid ${StartHubColors.Gray4};
`;

export const MyPageButton = styled.button`
  font: ${StartHubFont.Pretendard.Body1.SemiBold};
  color: ${StartHubColors.Black1};
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px 0;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${StartHubColors.Primary};
  }
`;

export const BusinessButton = styled.button`
  font: ${StartHubFont.Pretendard.Body1.SemiBold};
  color: ${StartHubColors.Black1};
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px 0;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${StartHubColors.Primary};
  }
`;