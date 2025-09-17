import * as S from "./style";
import { ReactComponent as Email } from "@assets/icons/email.svg";
import { ReactComponent as Call } from "@assets/icons/call.svg";
import { ReactComponent as Location } from "@assets/icons/location.svg";
const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.FooterTop>
          <S.CompanySection>
            <S.WrapLogo>
              <S.Logo>
                Start<span>Hub</span>
              </S.Logo>
              <S.CompanyDescription>
                창업가들을 위한 최고의 플랫폼
                <br />
                아이디어부터 성공까지 함께합니다
              </S.CompanyDescription>
            </S.WrapLogo>
          </S.CompanySection>

          <S.LinksSection>
            <S.LinkColumn>
              <S.ColumnTitle>고객지원</S.ColumnTitle>
              <S.LinkItem href="https://forms.gle/7anaKGTEqfzadCQx9">1:1 문의</S.LinkItem>
            </S.LinkColumn>
          </S.LinksSection>

          <S.ContactSection>
            <S.ColumnTitle>연락처</S.ColumnTitle>
            <S.ContactInfo>
              <S.ContactItem>
                <Email /> starthub.noreply@gmail.com
              </S.ContactItem>
              <S.ContactItem>
                <Call /> 02-1234-5678
              </S.ContactItem>
              <S.ContactItem>
                <Location />
                대구광역시 달성군 구지면 창리로11길 93
              </S.ContactItem>
            </S.ContactInfo>
          </S.ContactSection>
        </S.FooterTop>

        <S.FooterBottom>
          <S.CopyrightSection>
            <S.BusinessInfo>(주)스타트허브</S.BusinessInfo>
            <S.Copyright>
              © 2025 StartHub. All rights reserved. made by 盡人事待天命
            </S.Copyright>
          </S.CopyrightSection>
        </S.FooterBottom>
      </S.FooterContent>
    </S.FooterContainer>
  );
};

export default Footer;
