import * as S from "./style";
import { Competitor } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";
import defaultLogo from "@assets/images/default=business.svg?url";

interface CompetitorCardProps {
  competitor: Competitor;
}

const CompetitorCard = ({ competitor }: CompetitorCardProps) => (
  <S.CompetitorCard>
    <S.CompetitorHeader>
      <S.CompetitorLogo
        src={competitor.logoUrl || defaultLogo}
        alt={`${competitor.name} logo`}
        onError={(e) => {
          e.currentTarget.src = defaultLogo;
        }}
      />
      <S.CompetitorName>{competitor.name}</S.CompetitorName>
    </S.CompetitorHeader>
    <S.InfoBox>
      <S.InfoLabel>예상 규모</S.InfoLabel>
      <S.InfoValue>{formatTextWithBold(competitor.estimatedScale, true)}</S.InfoValue>
    </S.InfoBox>
    <S.InfoBox>
      <S.InfoLabel>시장 점유율</S.InfoLabel>
      <S.InfoValue>{formatTextWithBold(competitor.marketShare, true)}</S.InfoValue>
    </S.InfoBox>
    <S.DetailSection>
      <S.DetailText>유사점:</S.DetailText>
      <p>{formatTextWithBold(competitor.similarities.join(", "), true)}</p>
    </S.DetailSection>
    <S.DetailSection>
      <S.DetailText>차이점:</S.DetailText>
      <p>{formatTextWithBold(competitor.differences.join(", "), true)}</p>
    </S.DetailSection>
  </S.CompetitorCard>
);

export default CompetitorCard;
