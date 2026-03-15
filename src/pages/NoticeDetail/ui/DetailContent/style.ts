import styled from "styled-components";
import { StartHubFont, StartHubColors } from "@/shared/design";

export const Container = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  padding: 50px 65px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
  margin-bottom: 150px;
`;

export const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NoticeTitle = styled.div`
  border-bottom: 1px solid #dadada;
  padding-bottom: 24px;

  .title {
    ${StartHubFont.Pretendard.Headlines1.Bold}
    margin: 16px 0 20px 0;
  }

  .reception-period {
    ${StartHubFont.Pretendard.Body1.Medium}
    margin: 0;
  }
`;

export const FileLinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 16px;
`;

export const FileLink = styled.a`
  ${StartHubFont.Pretendard.Caption1.Regular}
  color: ${StartHubColors.Primary};
  text-decoration: none;
`;

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 4px;

  p {
    ${StartHubFont.Pretendard.Headlines2.SemiBold};
    color: ${StartHubColors.Primary};
    margin-right: 4px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SourceTag = styled.span<{ $source: string }>`
  ${StartHubFont.Pretendard.Body2.SemiBold}
  padding: 4px 12px;
  border-radius: 5px;
  background-color: ${({ $source }) =>
    $source === "BIZINFO"
      ? "#FFF3E8"
      : $source === "K_STARTUP"
        ? "#FFE8E8"
        : StartHubColors.Gray4};
  color: ${({ $source }) =>
    $source === "BIZINFO"
      ? "#E3A15E"
      : $source === "K_STARTUP"
        ? "#E35E5E"
        : StartHubColors.Gray2};
`;

export const ContentWrapper = styled.div`
  line-height: 1.6;
  width: 100%;
  overflow-x: auto;

  .dot_list-wrap p.title {
    ${StartHubFont.Pretendard.Headlines1.SemiBold}
    padding-top: 20px;
    scroll-margin-top: 100px;
  }

  .dot_list-wrap h1 {
    ${StartHubFont.Pretendard.Headlines1.Bold}
    padding-top: 20px;
    scroll-margin-top: 100px;
  }

  .dot_list-wrap h2 {
    ${StartHubFont.Pretendard.Headlines2.Bold}
    margin: 40px 0 20px 0;
    padding-top: 20px;
    scroll-margin-top: 100px;
  }

  .dot_list-wrap h3 {
    ${StartHubFont.Pretendard.Headlines2.SemiBold}
    margin: 32px 0 16px 0;
    padding-top: 20px;
    scroll-margin-top: 100px;
  }

  .dot_list-wrap h4 {
    ${StartHubFont.Pretendard.Body1.SemiBold}
    margin: 24px 0 12px 0;
    padding-top: 20px;
    scroll-margin-top: 100px;
  }

  .table_inner p.tit {
    ${StartHubFont.Pretendard.Body2.SemiBold}
    margin-bottom: 12px;
    line-height: 1.6;
  }

  .dot_list-wrap p {
    ${StartHubFont.Pretendard.Body2.Regular}
  }

  .dot_list-wrap strong,
  .dot_list-wrap b {
    ${StartHubFont.Pretendard.Body2.SemiBold}
  }

  .dot_list-wrap ul,
  .dot_list-wrap ol {
    padding-left: 20px;
    margin: 16px 0;
  }

  .dot_list-wrap li {
    margin-bottom: 8px;
  }

  .dot_list p.tit {
    ${StartHubFont.Pretendard.Body2.SemiBold}
    margin-bottom: 12px;
    line-height: 1.6;
  }
  .txt-button a {
    ${StartHubFont.Pretendard.Body2.Medium}
    color: ${StartHubColors.Primary};
    text-decoration: underline;
  }

  .txt-button a:hover {
    ${StartHubFont.Pretendard.Body2.SemiBold}
  }

  .dot_list-wrap small,
  .dot_list-wrap .caption {
    ${StartHubFont.Pretendard.Caption1.Regular}
  }
`;

export const Sidebar = styled.aside`
  flex-shrink: 0;
  width: 250px;
  position: sticky;
  top: 170px;
  height: fit-content;
  padding-left: 24px;

  svg {
    width: 32px;
    height: 33px;
    margin-bottom: 13px;
    margin-right: 7px;
  }
`;

export const TableOfContents = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: fit-content;
  border-left: 2px solid ${StartHubColors.Black1};
`;

export const TOCItem = styled.li<{ level: number; $isActive: boolean }>`
  ${StartHubFont.Pretendard.Body1.Regular}
  padding: 8px 16px;
  margin-bottom: 4px;
  border-radius: 6px;
  cursor: pointer;
  padding-left: ${({ level }) => 16 + (level - 1) * 20}px;

  color: ${({ $isActive }) =>
    $isActive ? StartHubColors.Black1 : StartHubColors.Gray2};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
`;

export const HeartButton = styled.button`
  background: none;
  cursor: pointer;
  border: none;
`;

export const PDFSection = styled.div`
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid ${StartHubColors.Gray4};

  p {
    ${StartHubFont.Pretendard.Headlines2.Bold}
    margin-bottom: 20px;
    color: ${StartHubColors.Black1};
  }
`;
