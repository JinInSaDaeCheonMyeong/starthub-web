import styled from 'styled-components';
import { StartHubColors } from '@/shared/design';

export const ProfileLayout = styled.div`
  display: flex;
  gap: 40px;
  padding: 0 80px 40px 80px;
  background-color: ${StartHubColors.White1};
  margin-top: -136px;
`;

export const Header = styled.div`
  background-color: ${StartHubColors.Primary};
  width: 100%;
  height: 22px;
`;

export const Banner = styled.div`
  width: 100%;
  background: linear-gradient(135deg, ${StartHubColors.Primary} 0%, #4641DF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 1;
`;

export const DetailCard = styled.div`
  flex: 1;
  background-color: ${StartHubColors.White1};
  border-radius: 10px;
  padding: 40px 48px;
  border: 3px solid ${StartHubColors.Gray4};
  height: fit-content;
  position: relative;
  z-index: 2;
  margin-right: 40px;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 24px;
  text-align: center;
`;

export const EmptyStateMessage = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${StartHubColors.Black1};
  margin: 0;
`;

export const EmptyStateButton = styled.button`
  background: ${StartHubColors.Primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4A90E2;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(70, 65, 223, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 24px;
`;

export const EmptyMessage = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const RegisterButton = styled.button`
  background: ${StartHubColors.Primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4A90E2;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;