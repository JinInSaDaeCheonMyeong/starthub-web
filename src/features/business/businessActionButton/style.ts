import styled from 'styled-components';
import { StartHubColors } from '@/shared/design';

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
  padding-top: 24px;
`;

export const BaseButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const SaveButton = styled(BaseButton)`
  background: ${StartHubColors.Primary};
  color: white;
  
  &:hover:not(:disabled) {
    background: #4A90E2;
  }
`;

export const CancelButton = styled(BaseButton)`
  background: ${StartHubColors.Gray4};
  color: ${StartHubColors.Black1};
  
  &:hover:not(:disabled) {
    background: ${StartHubColors.Gray3};
  }
`;

export const EditButton = styled(BaseButton)`
  background: ${StartHubColors.Primary};
  color: white;
  
  &:hover:not(:disabled) {
    background: #4A90E2;
  }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;