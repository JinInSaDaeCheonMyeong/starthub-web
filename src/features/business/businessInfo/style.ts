import styled from 'styled-components';
import { StartHubColors } from '@/shared/design';

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 20px 0;
  // border-bottom: 1px solid ${StartHubColors.Gray4};
  margin-bottom: 20px;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  margin-top: -20px;
`;

export const ProfileImage = styled.img`
  width: 109px;
  height: 109px;
  border-radius: 50%;
  object-fit: cover;
`;

export const BasicInfo = styled.div`
  flex: 1;
`;

export const CompanyName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${StartHubColors.Black1};
  margin: 0 0 8px 0;
`;

export const CompanyDescription = styled.p`
  font-size: 14px;
  color: ${StartHubColors.Gray1};
  margin: 0;
  line-height: 1.4;
`;

export const EditButton = styled.button`
  background: ${StartHubColors.Primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${StartHubColors.Primary};
  }
`;