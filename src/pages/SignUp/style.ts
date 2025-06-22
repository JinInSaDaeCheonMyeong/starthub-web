import styled from 'styled-components';
import { StartHubColors, StartHubFont } from '@/shared/design';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${StartHubColors.White2};
  padding: 20px;

  h2{
    font:${StartHubFont.Pretendard.Body1.SemiBold};
    color: ${StartHubColors.Black1};
    text-align: center;
  }
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 40px 80px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 30px 40px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 20px;
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;