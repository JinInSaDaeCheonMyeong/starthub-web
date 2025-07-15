import styled from 'styled-components';
import { StartHubColors, StartHubFont } from '@/shared/design';

export const ProfileFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 32px;
`;

export const ProfileInput = styled.input`
  font: ${StartHubFont.Pretendard.Body2.Regular};
  padding: 8px 12px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 6px;
  margin-top: 4px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
`;

export const EmailInput = styled.div`
  font: ${StartHubFont.Pretendard.Body2.Regular};
  padding: 8px 12px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 6px;
  margin-top: 4px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const DisabledLabel = styled(Label)`
  color: ${StartHubColors.Black1};
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 12px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 6px;
  resize: vertical;
  margin-top: 4px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 6px;
  margin-top: 4px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const SelectItem = styled(Select)`
  flex: 1;
  margin-top: 0;
`;

export const HelpText = styled.p`
  font-size: 12px;
  color: ${StartHubColors.Gray4};
  margin-top: 4px;
  margin-bottom: 0;
`;

export const FieldContainer = styled.div`
  margin-bottom: 24px;
`;

export const DisabledInput = styled(ProfileInput)`
  background-color: ${StartHubColors.Gray3};
  opacity: 0.5;
`;

// ViewMode용 스타일들 (기존에 있다면)
export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid ${StartHubColors.Gray2};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-weight: 500;
  color: ${StartHubColors.Gray3};
  min-width: 80px;
`;

export const InfoValue = styled.span`
  flex: 1;
  text-align: right;
  color: ${StartHubColors.Black1};
`;