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
  z-index: 1 ;
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