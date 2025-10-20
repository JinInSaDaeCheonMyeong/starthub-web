import * as S from "./style";

const BmcGeneratingSkeleton = () => {
  return (
    <S.Container>
      <S.Header>
        <S.SkeletonTitle />
        <S.SkeletonSubtitle />
      </S.Header>

      <S.BmcGrid>
        {Array.from({ length: 9 }, (_, index) => (
          <S.BmcSection key={index}>
            <S.SkeletonSectionTitle />
            <S.SkeletonContent />
            <S.SkeletonContent />
            <S.SkeletonContent />
          </S.BmcSection>
        ))}
      </S.BmcGrid>

      <S.GeneratingMessage>
        <S.LoadingSpinner />
        <S.MessageText>스타트허브 AI가 BMC를 생성하고 있습니다...</S.MessageText>
        <S.SubMessage>잠시만 기다려주세요.</S.SubMessage>
      </S.GeneratingMessage>
    </S.Container>
  );
};

export default BmcGeneratingSkeleton;