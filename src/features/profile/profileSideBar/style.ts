import styled from 'styled-components';
import { StartHubColors, StartHubFont } from '@/shared/design';

export const SideCard = styled.div`
  width: 260px;
  background-color: ${StartHubColors.White1};
  border-radius: 12px;
  padding: 32px 24px 14px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid ${StartHubColors.Gray4};
  border-radius: 10px;
  height: fit-content;
  position: relative;
  z-index: 2;
  margin-left: 40px;
`;

export const ProfileImage = styled.img`
  width: 109px;
  height: 109px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  transition: opacity 0.2s ease;
  
`;

export const ProfileName = styled.div`
  font: ${StartHubFont.Pretendard.Body1.SemiBold};
`;

export const ProfileEmail = styled.div`
  font: ${StartHubFont.Pretendard.Caption2.Regular};
  color: ${StartHubColors.Black1};
  margin-top: 7px;
  margin-bottom: 24px;
`;

export const PolicySection = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 22px;
`;

export const PolicyTitle = styled.div`
  position: relative;
  padding-top: 14px;
  font: ${StartHubFont.Pretendard.Caption1.Medium};

  &:hover {
    color: ${StartHubColors.Primary};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -24px;
    width: calc(100% + 48px);
    height: 1px;
    background-color: ${StartHubColors.Gray3};
  }
`;

export const PolicyItem = styled.div`
  position: relative;
  padding-top: 14px;
  margin-top: 14px;
  font: ${StartHubFont.Pretendard.Caption1.Medium};
  cursor: pointer;
  
  &:hover {
    color: ${StartHubColors.Primary};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -24px;
    width: calc(100% + 48px);
    height: 1px;
    background-color: ${StartHubColors.Gray3};
  }
`;

export const LogoutButtonWrapper = styled.div`
  position: relative;
  margin-top: 14px;
  padding-top: 8px;
  width: 100%;
`;

export const LogoutButtonLine = styled.div`
  position: absolute;
  top: 0;
  left: -24px;
  right: -24px;
  height: 1px;
  background-color: ${StartHubColors.Gray3};
`;
