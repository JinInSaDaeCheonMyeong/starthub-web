import styled from 'styled-components';
import { StartHubColors, StartHubFont } from '@/shared/design';

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`;

export const ProfileImageLarge = styled.img`
  width: 109px;
  height: 109px;
  border-radius: 50%;
  object-fit: cover;
  transition: opacity 0.2s ease;
`;

export const ProfileTitle = styled.h2`
  font: ${StartHubFont.Pretendard.Headlines1.Bold};
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

export const EditIcon = styled.span`
  width: 16px;
  height: 16px;
  background-image: url('/icons/edit.svg');
  background-size: cover;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
`;

export const ProfileSubtitle = styled.p`
  margin: 4px 0 0 0;
  font: ${StartHubFont.Pretendard.Caption1.Medium};
  color: ${StartHubColors.Gray2};
`;