import styled from 'styled-components';
import { StartHubColors } from '@/shared/design';

export const EditContainer = styled.div`
  margin-bottom: 20px;
`;

export const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${StartHubColors.Black1};
  margin-bottom: 4px;
`;

export const Required = styled.span`
  color: ${StartHubColors.Error};
  margin-left: 4px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${StartHubColors.Gray4};
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
  
  &::placeholder {
    color: ${StartHubColors.Gray2};
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid ${StartHubColors.Gray4};
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
  
  &::placeholder {
    color: ${StartHubColors.Gray2};
  }
`;

export const SelectInput = styled.select`
  padding: 12px 16px;
  border: 1px solid ${StartHubColors.Gray4};
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
`;

export const AddressInputGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const AddressInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${StartHubColors.Gray4};
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
  
  &::placeholder {
    color: ${StartHubColors.Gray2};
  }
`;

export const AddressSearchButton = styled.button`
  padding: 12px 16px;
  background: ${StartHubColors.Primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;
`;

export const DateInputGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const DateSelect = styled.select`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${StartHubColors.Gray4};
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
`;