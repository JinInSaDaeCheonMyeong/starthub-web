import * as S from "./style";
import BoxMenu from "@/features/boxMenu/ui";
import SectionBlock from "@/shared/ui/SectionBlock";
import { useGetNotice } from "@/features/notice/getNotice/useGetNotice";
import NoticeCard from "@/shared/ui/NoticeCard";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";

const MainContent = () => {
  return (
    <S.ContentContainer>
      <SectionBlock
        title="교육 분야 최신 공고 보러가기"
        path="/notices/education"
      >
        <S.BoxMenuContainer>
          <SoftWareNotice />
        </S.BoxMenuContainer>
      </SectionBlock>

      <SectionBlock title="AI 추천 공고" path="/notices/ai">
        <S.NoticeContainer>
          <RecommendedAINotice />
        </S.NoticeContainer>
      </SectionBlock>

      <S.BoxMenuContainer>
        <BoxMenu />
      </S.BoxMenuContainer>
    </S.ContentContainer>
  );
};

const RecommendedAINotice = () => {
  const { data, isLoading } = useGetNotice({
    page: 0,
    size: 4,
    sort: "",
  });

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, idx) => (
          <NoticeSkeleton key={idx} />
        ))}
      </>
    );
  }

  return (
    <>
      {data?.content.map((item) => (
        <NoticeCard key={item.url} notice={item} />
      ))}
    </>
  );
};

const SoftWareNotice = () => {
  const { data, isLoading } = useGetNoticeSearch({
    supportField: "멘토링ㆍ컨설팅ㆍ교육",
    page: 0,
    size: 4,
    sort: "createdAt,desc",
  });
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, idx) => (
          <NoticeSkeleton key={idx} />
        ))}
      </>
    );
  }

  return (
    <>
      {data?.content.map((item) => (
        <NoticeCard key={item.url} notice={item} />
      ))}
    </>
  );
};

export default MainContent;
