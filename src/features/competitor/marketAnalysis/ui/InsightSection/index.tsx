import * as S from "./style";
import { Strengths, Weaknesses } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface InsightSectionProps {
  strengths: Strengths;
  weaknesses: Weaknesses;
}

const InsightSection: React.FC<InsightSectionProps> = ({
  strengths,
  weaknesses,
}) => {
  return (
    <S.Section>
      <S.SectionTitle>2. 기회/위협 인사이트</S.SectionTitle>
      <S.InsightGrid>
        <S.InsightCard type="opportunity">
          <S.InsightTitle type="opportunity">기회</S.InsightTitle>
          {strengths.competitiveAdvantages.map((advantage, index) => (
            <S.InsightItem key={index} type="opportunity">
              <S.InsightText type="opportunity">{formatTextWithBold(advantage)}</S.InsightText>
            </S.InsightItem>
          ))}
          {strengths.uniqueValuePropositions.map((proposition, index) => (
            <S.InsightItem key={index} type="opportunity">
              <S.InsightText type="opportunity">{formatTextWithBold(proposition)}</S.InsightText>
            </S.InsightItem>
          ))}
          {strengths.marketOpportunities.map((opportunity, index) => (
            <S.InsightItem key={index} type="opportunity">
              <S.InsightText type="opportunity">{formatTextWithBold(opportunity)}</S.InsightText>
            </S.InsightItem>
          ))}
        </S.InsightCard>

        <S.InsightCard type="threat">
          <S.InsightTitle type="threat">위협</S.InsightTitle>
          {weaknesses.competitiveDisadvantages.map((disadvantage, index) => (
            <S.InsightItem key={index} type="threat">
              <S.InsightText type="threat">{formatTextWithBold(disadvantage)}</S.InsightText>
            </S.InsightItem>
          ))}
          {weaknesses.marketChallenges.map((challenge, index) => (
            <S.InsightItem key={index} type="threat">
              <S.InsightText type="threat">{formatTextWithBold(challenge)}</S.InsightText>
            </S.InsightItem>
          ))}
          {weaknesses.resourceLimitations.map((limitation, index) => (
            <S.InsightItem key={index} type="threat">
              <S.InsightText type="threat">{formatTextWithBold(limitation)}</S.InsightText>
            </S.InsightItem>
          ))}
        </S.InsightCard>
      </S.InsightGrid>
    </S.Section>
  );
};

export default InsightSection;
