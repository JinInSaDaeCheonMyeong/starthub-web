import { StartHubColors, StartHubFont } from "@/shared/design";
import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  background-color: ${StartHubColors.White2};
  border-top: 1px solid #e5e5e5;
  user-select: text;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 20px;
`;

export const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const CompanySection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WrapLogo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Logo = styled.div`
  ${StartHubFont.WantedSans.Title1}

  span {
    color: ${StartHubColors.Primary};
    ${StartHubFont.WantedSans.Title1}
  }
`;

export const CompanyDescription = styled.p`
  ${StartHubFont.Pretendard.Caption1.Regular}
  color: ${StartHubColors.Gray2};
  line-height: 1.5;
  margin: 0;
`;

export const LinksSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

export const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ColumnTitle = styled.h4`
  ${StartHubFont.Pretendard.Body2.SemiBold}
  color: ${StartHubColors.Black1};
  margin: 0 0 12px 0;
`;

export const LinkItem = styled.a`
  ${StartHubFont.Pretendard.Caption1.Regular}
  color: ${StartHubColors.Gray2};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${StartHubColors.Primary};
    transition: color 0.2s ease;
  }
`;

export const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ContactItem = styled.span`
  ${StartHubFont.Pretendard.Caption1.Regular}
  color: ${StartHubColors.Gray2};
  line-height: 1.4;
  display: flex;
  align-items: center;
  svg {
    width: 14px;
    height: 14px;
    margin-right: 3px;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

export const SocialIcon = styled.span`
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const LegalLinks = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const LegalItem = styled.a`
  ${StartHubFont.Pretendard.Caption2.Regular}
  color: ${StartHubColors.Gray2};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${StartHubColors.Primary};
    transition: color 0.2s ease;
  }

  &:not(:last-child)::after {
    content: "|";
    margin-left: 16px;
    color: #d0d0d0;
  }
`;

export const CopyrightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const BusinessInfo = styled.span`
  ${StartHubFont.Pretendard.Caption2.Regular}
  color: ${StartHubColors.Gray2};
`;

export const Copyright = styled.span`
  ${StartHubFont.Pretendard.Caption2.Regular}
  color: ${StartHubColors.Gray2};
`;
