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
  border-radius: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 40px 80px;
  width: 100%;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font:${StartHubFont.Pretendard.Body1.SemiBold};
  color: #333;
  text-align: center;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
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
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
  flex-wrap: nowrap;
`;

export const VerificationWrapper = styled.div`
    height: 50px;
    position: relative;
    display: flex;
    width: 320px;
    align-items: center;
    gap: 5px;
`

export const InputButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 10px;
  background-color: ${StartHubColors.White1};
  color: ${StartHubColors.Primary};
  font: ${StartHubFont.Pretendard.Caption1.Medium};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export const VerificationInputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const VerifyButton = styled.button`
  display: flex;  
  justify-content: center;
  align-items: center;
  padding: 0 16px;

  background-color: white;
  color: ${StartHubColors.Primary};
  font: ${StartHubFont.Pretendard.Caption1.Medium};

  height: 50px;
  border: 1px solid #4169E1;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;


  width: 100%;
  max-width: 108px;

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
  font: ${StartHubFont.Pretendard.Caption1.Regular};
  color: ${StartHubColors.Gray2};
  flex-grow: 1;
`;

export const CheckboxLabelMain = styled.label`
  font-size: 14px;
  font: ${StartHubFont.Pretendard.Body2.Regular};
  color: ${StartHubColors.Black1};
  flex-grow: 1;
`