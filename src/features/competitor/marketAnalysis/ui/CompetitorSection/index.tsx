import React from "react";
import * as S from "./style";
import { Competitor, UserBmc } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";
import BmcSidebar from "../BmcSidebar";

interface CompetitorSectionProps {
  domesticCompetitors: Competitor[];
  foreignCompetitors: Competitor[];
  userBmc: UserBmc;
}

const CompetitorSection: React.FC<CompetitorSectionProps> = ({
  domesticCompetitors,
  foreignCompetitors,
  userBmc,
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "@/assets/images/default=business.svg";
  };

  const renderCompetitorCards = (competitorList: Competitor[]) => (
    <S.CompetitorGrid>
      {competitorList.map((competitor, index) => (
        <S.CompetitorCard key={index}>
          <S.CompetitorHeader>
            <img
              src={competitor.logoUrl || "@/assets/images/default=business.svg"}
              alt={`${competitor.name} logo`}
              onError={handleImageError}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
            <S.CompetitorName>{competitor.name}</S.CompetitorName>
          </S.CompetitorHeader>
          <S.InfoBox>
            <S.InfoLabel>예상 규모</S.InfoLabel>
            <S.InfoValue>
              {formatTextWithBold(competitor.estimatedScale)}
            </S.InfoValue>
          </S.InfoBox>
          <S.InfoBox>
            <S.InfoLabel>시장 점유율</S.InfoLabel>
            <S.InfoValue>
              {formatTextWithBold(competitor.marketShare)}
            </S.InfoValue>
          </S.InfoBox>
          <S.DetailSection>
            <S.DetailText>유사점:</S.DetailText>
            <p>{formatTextWithBold(competitor.similarities.join(", "))}</p>
          </S.DetailSection>
          <S.DetailSection>
            <S.DetailText>차이점:</S.DetailText>
            <p>{formatTextWithBold(competitor.differences.join(", "))}</p>
          </S.DetailSection>
        </S.CompetitorCard>
      ))}
    </S.CompetitorGrid>
  );

  return (
    <S.CompetitorSectionWrapper>
      <S.CompetitorContent>
        <S.SubTitle>경쟁사와의 규모 비교</S.SubTitle>
        {domesticCompetitors?.length > 0 && (
          <>
            <S.SubTitle>1. 국내 경쟁사</S.SubTitle>
            {renderCompetitorCards(domesticCompetitors)}
          </>
        )}
        {foreignCompetitors?.length > 0 && (
          <>
            <S.SubTitle>2. 해외 경쟁사</S.SubTitle>
            {renderCompetitorCards(foreignCompetitors)}
          </>
        )}
      </S.CompetitorContent>
      <BmcSidebar userBmc={userBmc} />
    </S.CompetitorSectionWrapper>
  );
};

export default CompetitorSection;
