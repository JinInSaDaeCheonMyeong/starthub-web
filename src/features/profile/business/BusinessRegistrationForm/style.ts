import styled from "styled-components";
import { StartHubColors } from "@/shared/design";

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const FormSection = styled.div`
  margin-bottom: 32px;
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
  text-align: center;
`;

export const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E5E5;
`;

export const CompanyLogo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid #E5E5E5;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${StartHubColors.Primary};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CompanyBasicInfo = styled.div`
  flex: 1;
`;

export const CompanyName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
`;

export const CompanyDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  
  &.required::after {
    content: "*";
    color: ${StartHubColors.Error};
    margin-left: 4px;
  }
`;

export const FormInput = styled.input`
  padding: 12px 16px;
  border: 1px solid ${StartHubColors.White1};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }

  &:disabled {
    background-color: ${StartHubColors.White1};
    color: ${StartHubColors.Gray2};
    cursor: not-allowed;
  }
`;

export const FormTextarea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid ${StartHubColors.White1};
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }

  &:disabled {
    background-color: ${StartHubColors.White1};
    color: ${StartHubColors.Gray3};
    cursor: not-allowed;
  }
`;

export const FormSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid ${StartHubColors.Gray4};
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }

  &:disabled {
    background-color: ${StartHubColors.Gray4};
    color: ${StartHubColors.Gray2};
    cursor: not-allowed;
  }
`;