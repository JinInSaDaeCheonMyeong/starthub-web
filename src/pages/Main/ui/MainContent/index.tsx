import * as S from "./style";
import BoxMenu from "@/features/boxMenu/ui";
import SectionBlock from "@/shared/ui/SectionBlock";
import NoticeCard from "@/shared/ui/NoticeCard";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";
import { useGetNoticeRecommend } from "@/features/notice/getNoticeRecommend/useGetNoticeRecommend";
import { NoticeType } from "@/entities/notice/model/notice.type";
import AiNotice from "@assets/images/aiNotice.png";

const MainContent = () => {
  const { data } = useGetNoticeRecommend();

  return (
    <S.ContentContainer>
      <SectionBlock
        title="교육 분야 최신 공고 보러가기"
        path="/notices/education"
      >
        <S.BoxMenuContainer>
          <EducationNotice />
        </S.BoxMenuContainer>
      </SectionBlock>

      <SectionBlock
        title={
          !data
            ? "로그인 후 AI 맞춤형 공고를 추천받을 수 있어요!"
            : "AI 추천 공고"
        }
        path={!data ? "/sign-in" : "/notices/recommend"}
      >
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
  const { data, isLoading } = useGetNoticeRecommend();

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, idx) => (
          <NoticeSkeleton key={idx} />
        ))}
      </>
    );
  }

  if (!data) {
    return (
      <>
        <img
          src={AiNotice}
          alt="AI 공고 로그인 유도 배너"
          style={{ width: "1040px", height: "auto" }}
        />
      </>
    );
  }

  return (
    <>
      {data?.slice(0, 4).map((item: NoticeType) => (
        <NoticeCard key={item.url} notice={item} />
      ))}
    </>
  );
};

const EducationNotice = () => {
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
      {data?.content?.map((item: NoticeType) => (
        <NoticeCard key={item.url} notice={item} />
      ))}
    </>
  );
};

export default MainContent;
