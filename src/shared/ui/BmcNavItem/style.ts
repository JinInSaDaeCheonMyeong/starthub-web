import styled, { css } from 'styled-components';

interface ContainerProps {
  $active: boolean;
  $completed: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  ${({ $active, $completed }) => {
    if ($completed) {
      return css`
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
      `;
    } else if ($active) {
      return css`
        background-color: #cce5ff;
        border: 1px solid #99d1ff;
        color: #0056b3;
      `;
    } else {
      return css`
        background-color: #f8f9fa;
        border: 1px solid #e9ecef;
        color: #6c757d;
        
        &:hover {
          background-color: #e9ecef;
        }
      `;
    }
  }}
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const TextGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  
  .step {
    font-size: 12px;
    font-weight: 500;
    opacity: 0.7;
    margin: 0;
  }
  
  .title {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
  }
  
  .description {
    font-size: 12px;
    opacity: 0.8;
    margin: 0;
    line-height: 1.4;
  }
`;

export const CompletedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #28a745;
  color: white;
  font-size: 12px;
  font-weight: bold;
  margin-left: 8px;
  flex-shrink: 0;
`;