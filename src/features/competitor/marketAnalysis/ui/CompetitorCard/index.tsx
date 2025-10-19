import * as S from "./style";
import { Competitor } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface CompetitorCardProps {
  competitor: Competitor;
}

const DEFAULT_LOGO = "/src/assets/images/default=business.svg";

const CompetitorCard = ({ competitor }: CompetitorCardProps) => (
  <S.CompetitorCard>
    <S.CompetitorHeader>
      <S.CompetitorLogo
        src={competitor.logoUrl || DEFAULT_LOGO}
        alt={`${competitor.name} logo`}
        onError={(e) => {
          e.currentTarget.src = DEFAULT_LOGO;
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
