import * as S from "./style";
import BoxMenu from "@/features/boxMenu/ui";
import SectionBlock from "@/shared/ui/SectionBlock";

const MainContent = () => {

  return (
    <S.ContentContainer>

      <SectionBlock title="IT/소프트웨어 분야 최신 공고 보러가기" path="/notices/software">
        <S.BoxMenuContainer>
          {/* IT/소프트웨어 분야 공고 */}
        </S.BoxMenuContainer>
      </SectionBlock>

      <SectionBlock title="AI 추천 공고" path="/notices/ai">
        <S.NoticeContainer>
          {/* AI추천 공고 */}
        </S.NoticeContainer>
      </SectionBlock>

      <S.BoxMenuContainer>
        <BoxMenu />
      </S.BoxMenuContainer>

    </S.ContentContainer>
  );
};

export default MainContent;
