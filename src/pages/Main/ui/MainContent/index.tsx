import * as S from "./style";
import BoxMenu from "@/features/boxMenu/ui";
import SectionBlock from "@/shared/ui/SectionBlock";
import { useGetNotice } from "@/features/notice/getNotice/useGetNotice";
import NoticeCard from "@/shared/ui/NoticeCard";

const MainContent = () => {
  return (
    <S.ContentContainer>
      <SectionBlock
        title="IT/소프트웨어 분야 최신 공고 보러가기"
        path="/notices/software"
      >
        <S.BoxMenuContainer>
          <SoftWareNotice/>
        </S.BoxMenuContainer>
      </SectionBlock>

      <SectionBlock title="AI 추천 공고" path="/notices/ai">
        <S.NoticeContainer>
          <RecomandAINotice />
        </S.NoticeContainer>
      </SectionBlock>

      <S.BoxMenuContainer>
        <BoxMenu />
      </S.BoxMenuContainer>
    </S.ContentContainer>
  );
};

const RecomandAINotice = () => {
  const { data } = useGetNotice({
    page: 0,
    size: 4,
    sort: [],
  });

  return (
    <>
      {data?.content.map((item) => (
        <NoticeCard key={item.url} notice={item} />
      ))}
    </>
  );
};

const SoftWareNotice = () =>{
  const {data} = useGetNotice({
    page: 0,
    size: 4,
    sort : []
  })

  return (
    <>
    {data?.content.map((item) => (
        <NoticeCard key={item.url} notice={item} />
    ))}
    </>
  );
}
export default MainContent;
