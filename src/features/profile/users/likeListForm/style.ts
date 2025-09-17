import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 0 160px 0 200px;
  height: 100%;
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 50px 20px 20px 60px;
`;

export const Title = styled.p`
  font: ${StartHubFont.Pretendard.Headlines1.SemiBold};
  color: ${StartHubColors.Black1};
  margin-bottom: 24px;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export const NoticeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const EmptyText = styled.p`
  font: ${StartHubFont.Pretendard.Body1.Regular};
  color: ${StartHubColors.Primary};
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  padding: 20px;
`;

export const ErrorText = styled.p`
  font: ${StartHubFont.Pretendard.Body1.Regular};
  color: ${StartHubColors.Error};
  margin-bottom: 10px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
