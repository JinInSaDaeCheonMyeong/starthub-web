import * as S from "./style";
import { UserScale } from "../../types";
import { formatTextWithBold } from "../../utils/textFormatter";

interface UserScaleSectionProps {
  userScale: UserScale;
}

const UserScaleSection: React.FC<UserScaleSectionProps> = ({ userScale }) => {
  return (
    <S.Section>
      <S.SectionTitle>1. 사용자 규모 분석</S.SectionTitle>
      <S.CardGrid>
        <S.Card>
          <S.CardTitle>예상 사용자 기반 규모</S.CardTitle>
          <S.CardContent>
            <S.CardText>{formatTextWithBold(userScale.estimatedUserBase, true)}</S.CardText>
          </S.CardContent>
        </S.Card>
        <S.Card>
          <S.CardTitle>시장 내 위치</S.CardTitle>
          <S.CardContent>
            <S.CardText>{formatTextWithBold(userScale.marketPosition, true)}</S.CardText>
          </S.CardContent>
        </S.Card>
        <S.Card>
          <S.CardTitle>성장 잠재력</S.CardTitle>
          <S.CardContent>
            <S.CardText>{formatTextWithBold(userScale.growthPotential, true)}</S.CardText>
          </S.CardContent>
        </S.Card>
      </S.CardGrid>
    </S.Section>
  );
};

export default UserScaleSection;
