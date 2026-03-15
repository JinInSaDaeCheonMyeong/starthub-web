import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

type CategoryColorProps = {
  $txColor?: string;
};

export const NoticeContainer = styled.div`
  width: 250px;
  height: 150px;
  background-color: ${StartHubColors.White1};
  border: 2px solid ${StartHubColors.Gray4};
  padding: 19px 20px;
  border-radius: 14px;
  p {
    ${StartHubFont.Pretendard.Caption2.Regular}
    font-size: 10px;
    margin: 5px 0 5px 0;
  }
`;

export const TitleText = styled.div`
  ${StartHubFont.Pretendard.Caption1.SemiBold}
  font-size: 14px;
  color: ${StartHubColors.Gray1};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;

  min-height: calc(1.4em * 2);
  line-height: 1.4em;
`;

export const Tag = styled.div`
  width: fit-content;
  height: 20px;
  background-color: ${StartHubColors.Gray4};
  display: flex;
  justify-content: center;
  align-items: center;
  ${StartHubFont.Pretendard.Caption2.Regular}
  padding: 6px;
  border-radius: 4px;
`;

export const CategoryContainer = styled.div<CategoryColorProps>`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 6px;
  span {
    ${StartHubFont.Pretendard.Caption2.Regular}
    color: ${StartHubColors.Primary};
  }
  svg {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
`;

export const SourceBadge = styled.div<{ $source: string }>`
  ${StartHubFont.Pretendard.Caption2.Medium}
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  background-color: ${({ $source }) =>
    $source === "K_STARTUP"
      ? "#FFE8E8"
      : $source === "BIZINFO"
        ? "#FFF3E8"
        : StartHubColors.Gray4};
  color: ${({ $source }) =>
    $source === "K_STARTUP"
      ? "#E35E5E"
      : $source === "BIZINFO"
        ? "#E3A15E"
        : StartHubColors.Gray2};

  svg {
    width: 12px;
    height: 12px;
    margin-right: 0;
  }

  span {
    color: inherit;
  }
`;
