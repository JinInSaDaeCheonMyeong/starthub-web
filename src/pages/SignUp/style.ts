import styled from 'styled-components';
import { StartHubColors } from '../../Design/color/StartHubColors';
import { StartHubFont } from '../../Design/text/StartHubFont';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  
  &::placeholder {
    color: #aaa;
  }
  
  &:focus {
    border-color: #4169E1;
  }
`;

export const VerificationCodeContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

export const VerificationInputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const VerifyButton = styled.button`
  padding: 0 20px;
  background-color: white;
  color: ${StartHubColors.Primary};
  font: ${StartHubFont.Pretendard.Caption1.Medium};
  width: 108px;
  height: 50px;
  border: 1px solid #4169E1;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f0f5ff;
  }
`;


export const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const ShowPasswordButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;
  margin: 5px 0;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #4169E1;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #555;
  flex-grow: 1;
`;

export const ArrowIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23aaa'%3E%3Cpath d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4169E1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3050C0;
  }
`;