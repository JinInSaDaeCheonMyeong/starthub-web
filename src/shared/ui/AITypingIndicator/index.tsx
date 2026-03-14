import * as S from "./style";

const AITypingIndicator = () => (
  <S.Wrapper>
    <S.Dot $delay={0} />
    <S.Dot $delay={200} />
    <S.Dot $delay={400} />
  </S.Wrapper>
);

export default AITypingIndicator;
