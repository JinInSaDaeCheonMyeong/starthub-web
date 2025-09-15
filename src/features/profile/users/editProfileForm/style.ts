import styled from "styled-components";
import { StartHubColors, StartHubFont } from "@/shared/design";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 0 160px 0 200px;
`;

export const SectionTitle = styled.h3`
  font: ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Black1};
  margin-bottom: 10px;

  span {
    color: ${StartHubColors.Primary};
    font-size: 14px;
  }
`;

export const MainContent = styled.section`
  flex: 1;
  padding: 0 40px 0 40px;
`;

export const HeaderSection = styled.div`
  margin-bottom: 30px;
  margin-top: 50px;
`;

export const Motto = styled.p`
  font: ${StartHubFont.Pretendard.Headlines2.SemiBold};
  color: ${StartHubColors.Black1};
  margin-bottom: 8px;
`;

export const Greeting = styled.h2`
  font: ${StartHubFont.Pretendard.Title2};
  color: ${StartHubColors.Black1};
`;

export const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

export const InfoRow = styled.tr`
  border-bottom: 1px solid ${StartHubColors.Gray3};
`;

export const InfoLabel = styled.th`
  text-align: left;
  padding: 20px;
  width: 150px;
  font: ${StartHubFont.Pretendard.Body2.Medium};
  color: ${StartHubColors.Black1};
`;

export const InfoValue = styled.td`
  padding: 12px;
  color: ${StartHubColors.Gray1};
  font: ${StartHubFont.Pretendard.Body2.Regular};
  text-align: right;
`;

// 지역 검색을 위한 새로운 스타일 추가
export const LocationSearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const LocationDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${StartHubColors.White1};
  border: 1px solid ${StartHubColors.Gray3};
  border-top: none;
  border-radius: 0 0 10px 10px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const LocationItem = styled.div`
  padding: 15px;
  cursor: pointer;
  font: ${StartHubFont.Pretendard.Body2.Regular};
  color: ${StartHubColors.Black1};
  border-bottom: 1px solid ${StartHubColors.Gray4};

  &:hover {
    background-color: ${StartHubColors.Gray4};
  }

  &:last-child {
    border-bottom: none;
  }
`;

// 생년월일 선택을 위한 새로운 스타일 추가
export const SelectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  width: 100%;
  height: 50px;
  padding: 15px;
  border: 1px solid ${StartHubColors.Gray3};
  border-radius: 10px;
  font: ${StartHubFont.Pretendard.Caption1.Regular};
  background-color: ${StartHubColors.White1};
  margin-bottom: 20px;
  color: ${StartHubColors.Black1};

  &:focus {
    outline: none;
    border-color: ${StartHubColors.Primary};
  }

  /* placeholder 효과를 위한 스타일 */
  &:invalid {
    color: #999;
  }

  option {
    color: ${StartHubColors.Black1};
  }

  option[value=""] {
    color: #999;
  }
`;
