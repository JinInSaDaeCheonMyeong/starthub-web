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

export const Title = styled.h2`
  font:${StartHubFont.Pretendard.Body1.SemiBold};
  color: ${StartHubColors.Black1};
  text-align: center;
`;

export const InputLabel = styled.label`
  font: ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Black1};
  margin-top: 10px;
`;

export const Divider = styled.div`
  width: 100%;
  max-width: 320px;
  height: 1px;
  background-color: ${StartHubColors.Gray3};
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`

export const InputField = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  
  &::placeholder {
    color: ${StartHubColors.Gray3};
  }
  
  &:focus {
    border-color: ${StartHubColors.Primary};
  }
`;

export const VerificationCodeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 320px;
  margin-bottom: 10px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
  }
`;

export const VerificationWrapper = styled.div`
  height: 50px;
  position: relative;
  display: flex;
  width: 100%;
  max-width: 320px;
  align-items: center;
  gap: 5px;
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`

export const InputButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 10px;
  background-color: ${StartHubColors.White1};
  color: ${StartHubColors.Gray3};
  font: ${StartHubFont.Pretendard.Caption1.Medium};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    color: ${StartHubColors.Primary};
  }
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
  min-width: 108px;
  flex-shrink: 0;

  &:hover {
    background-color: #f0f5ff;
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
    min-width: unset;
  }
`;



export const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  margin-bottom: 10px;
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  z-index: 1;
  
  @media (max-width: 480px) {
    right: 12px;
  }
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
  width: 100%;
  max-width: 320px;
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
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
  flex: 1;
  margin-right: 8px;

`;

export const CheckboxLabelMain = styled.label`
  font-size: 14px;
  font: ${StartHubFont.Pretendard.Body2.Regular};
  color: ${StartHubColors.Black1};
  flex-grow: 1;
`