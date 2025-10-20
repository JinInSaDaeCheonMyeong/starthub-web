import * as S from "./style";
import { GlobalExpansionStrategy } from "../../types";
import { removeAngleBrackets } from "../../utils/textFormatter";

interface GlobalExpansionSectionProps {
  globalExpansion: GlobalExpansionStrategy;
}

const GlobalExpansionSection: React.FC<GlobalExpansionSectionProps> = ({
  globalExpansion,
}) => {
  return (
    <S.Section>
      <S.SectionTitle>3. 해외 시장 진출 및 사업화 방안</S.SectionTitle>

      <S.MarketSection>
        <S.MarketItem>
          <S.MarketTitle>우선 진출 시장</S.MarketTitle>
          {globalExpansion.priorityMarkets.map((market, index) => (
            <S.MarketCard key={index}>
              <S.MarketCardTitle>{removeAngleBrackets(market)}</S.MarketCardTitle>
            </S.MarketCard>
          ))}
        </S.MarketItem>
      </S.MarketSection>

      <S.MarketSection>
        <S.MarketItem>
          <S.MarketTitle>진입 전략</S.MarketTitle>
          {globalExpansion.entryStrategies.map((strategy, index) => (
            <S.MarketCard key={index}>
              <S.MarketCardText>{removeAngleBrackets(strategy)}</S.MarketCardText>
            </S.MarketCard>
          ))}
        </S.MarketItem>
      </S.MarketSection>

      <S.MarketItem>
        <S.MarketTitle>현지화 요구사항</S.MarketTitle>
        <S.GridLayout>
          {globalExpansion.localizationRequirements.map(
            (requirement, index) => (
              <S.GridItem key={index}>
                <S.MarketCardText>{removeAngleBrackets(requirement)}</S.MarketCardText>
              </S.GridItem>
            )
          )}
        </S.GridLayout>
      </S.MarketItem>

      <S.MarketItem style={{ marginTop: "30px" }}>
        <S.MarketTitle>파트너십</S.MarketTitle>
        <S.GridLayout>
          {globalExpansion.partnershipOpportunities.map(
            (opportunity, index) => (
              <S.GridItem key={index}>
                <S.MarketCardText>{removeAngleBrackets(opportunity)}</S.MarketCardText>
              </S.GridItem>
            )
          )}
        </S.GridLayout>
      </S.MarketItem>

      <S.MarketItem style={{ marginTop: "30px" }}>
        <S.MarketTitle>예상 도전과제</S.MarketTitle>
        <S.ChallengeList>
          {globalExpansion.expectedChallenges.map((challenge, index) => (
            <S.ChallengeItem key={index}>
              <S.ChallengeText>{removeAngleBrackets(challenge)}</S.ChallengeText>
            </S.ChallengeItem>
          ))}
        </S.ChallengeList>
      </S.MarketItem>
    </S.Section>
  );
};

export default GlobalExpansionSection;
