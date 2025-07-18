import { StartHubColors } from '@/shared/design';
import styled, { css } from 'styled-components';

interface IconWrapperProps {
  $isActive?: boolean;
  $isCompleted?: boolean;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    transition: all 0.2s ease;
    
    ${({ $isCompleted, $isActive }) => {
      if ($isCompleted) {
        return css`
          fill: ${StartHubColors.Gray2};
        `;
      } else if ($isActive) {
        return css`
          fill: ${StartHubColors.Primary};
        `;
      } else {
        return css`
          fill: ${StartHubColors.Gray3};
        `;
      }
    }}
  }
`;