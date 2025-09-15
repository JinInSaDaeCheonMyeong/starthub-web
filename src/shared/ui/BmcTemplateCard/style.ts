import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const BmcTemplateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1024px;

  img {
    width: 242px;
    height: 100%;
    border-radius: 10px;
    border: 1px solid ${StartHubColors.Gray3};

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

export const ButtonContainer = styled.div`
  width: 242px;
  height: 170px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: ${StartHubColors.Primary};
    background-color: ${StartHubColors.White2};
  }
`;

export const Text = styled.p`
  font: ${StartHubFont.Pretendard.Body1.Medium};
  margin-bottom: 20px;
  gap: 6px;
`;

export const Container = styled.div`
  justify-content: space-between;
  width: 1024px;
  margin-top: 40px;
`

export const ImageWrapper = styled.div`
  height: 100%;
  background-color: ${StartHubColors.White1};
  width: 100%;
  img, ${ButtonContainer} {
    height: 170px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 2px;
  }
`;

export const TextContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;

  gap: 6px;
  background-color: ${StartHubColors.White1};
`;

export const Title = styled.p`
  color: ${StartHubColors.Black1};
  ${StartHubFont.Pretendard.Caption1.Regular};
`;

export const PlusIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
    fill: ${StartHubColors.Primary};
    transition: fill 0.3s ease;
  }
  
  &:hover & svg {
    fill: ${StartHubColors.Primary};
  }
`;