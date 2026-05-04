import BoxMenu from "@/features/boxMenu/ui";
import SectionBlock from "@/shared/ui/SectionBlock";
import NoticeCard from "@/shared/ui/NoticeCard";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";
import { useGetNoticeRecommend } from "@/features/notice/getNoticeRecommend/useGetNoticeRecommend";
import { NoticeType } from "@/entities/notice/model/notice.type";
import AiNotice from "@assets/images/aiNotice.png";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

const RecommendedAINotice = () => {
  const { data, isLoading } = useGetNoticeRecommend();

  if (isLoading) {
    return (
      <div  className="flex flex-row">
        {Array.from({ length: 4 }).map((_, idx) => (
          <NoticeSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <>
        <img
          src={AiNotice.src}
          alt="AI 공고 로그인 유도 배너"
          className="w-[1040px] h-[auto]"
        />
      </>
    );
  }

  return (
      <div className="flex gap-[10px]">
        {data?.slice(0, 4).map((item: NoticeType) => (
          <NoticeCard key={item.url} notice={item} />
        ))}
      </div>
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
      <div className="flex flex-row">
        {Array.from({ length: 4 }).map((_, idx) => (
          <NoticeSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-[10px]">
      {data?.content?.map((item: NoticeType) => (
        <NoticeCard key={item.url} notice={item} />
      ))}
    </div>
  );
};

const MainContent = () => {
  const {isLoggedIn} = useAuthStore()
  const { data } = useGetNoticeRecommend();

  return (
    <div className="w-[1040px] flex justify-center flex-col">
      <SectionBlock
        title="교육 분야 최신 공고 보러가기"
        path="/notices/education"
      >
        <div className="flex justify-center mb-10">
          <EducationNotice />
        </div>
      </SectionBlock>

      <SectionBlock
        title={
          !isLoggedIn
            ? "로그인 후 AI 맞춤형 공고를 추천받을 수 있어요!"
            : "AI 추천 공고"
        }
        path={!data ? "/sign-in" : "/notices/recommend"}
      >
        <div className="flex justify-center mb-8">
          <RecommendedAINotice />
        </div>
      </SectionBlock>

      <div className="flex justify-center mb-10">
        <BoxMenu />
      </div>
    </div>
  );
};

export default MainContent;
