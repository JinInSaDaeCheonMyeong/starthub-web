import styled from "styled-components";
import { StartHubColors } from "@/design/color/StartHubColors";
import { StartHubFont } from "@/design/text/StartHubFont";
export const StartHubButton = styled.div`
  color: ${StartHubColors.Primary};
  ${StartHubFont.Pretendard.Headlines1}
`;

export const SignInNormalText = styled.p`
  justify-content: center;
  color: ${StartHubColors.Black1};
  ${StartHubFont.Pretendard.Body1}
  span {
    color: ${StartHubColors.Primary};
  }
`;

export const SignInLogoField = styled.div`
  justify-content: center;
  margin-bottom: 34px;
  text-align : center;
`;

export const SignInOptions = styled.div`
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  p {
    color: ${StartHubColors.Gray2};
    ${StartHubFont.Pretendard.Caption1.Medium}
  }
`;

export const SignBoxContainer = styled.div`
  position: absolute;
  align-items: center;
`;

export const AutoSignInField = styled.div`
  display: flex;
  align-items: center;
  p{
    color: ${StartHubColors.Gray2};
    ${StartHubFont.Pretendard.Caption1.Medium}
    margin-left: 4px;
  }
`;