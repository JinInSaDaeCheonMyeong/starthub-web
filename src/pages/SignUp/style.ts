import styled from 'styled-components';
import { StartHubFont } from "../../Design/text/StartHubFont";
import { StartHubColors } from "../../Design/color/StartHubColors";

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

export const LogoText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${StartHubColors.Black1};
  margin-top: 10px;
  margin-bottom: 0;
  ${StartHubFont.Pretendard.Body1.SemiBold}
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

export const VerificationInput = styled(InputField)`
  flex: 1;
`;

export const VerifyButton = styled.button`
  padding: 0 20px;
  background-color: white;
  color: #4169E1;
  border: 1px solid #4169E1;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f0f5ff;
  }
`;

export const PasswordInput = styled.div`
  position: relative;
  width: 100%;
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

export const EyeIcon = styled.span<{ open: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23aaa'%3E%3Cpath d='${props => props.open 
    ? "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
    : "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
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