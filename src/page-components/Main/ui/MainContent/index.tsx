import BoxMenu from "@/features/boxMenu/ui";
import SectionBlock from "@/shared/ui/SectionBlock";
import NoticeCard from "@/shared/ui/NoticeCard";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";
import { useGetNoticeRecommend } from "@/features/notice/getNoticeRecommend/useGetNoticeRecommend";
import { NoticeType } from "@/entities/notice/model/notice.type";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import { useState, useEffect } from "react";

const RnDNotice = () => {
  const { data, isLoading } = useGetNoticeSearch({
    supportField: "기술개발(R&D)",
    page: 0,
    size: 4,
    sort: "createdAt,desc",
  });

  if (isLoading) {
    return (
      <div className="flex gap-2.5 w-full overflow-x-auto lg:overflow-x-visible lg:justify-center">
        {Array.from({ length: 4 }).map((_, idx) => (
          <NoticeSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* 모바일: 스크롤 형태 */}
      <div className="lg:hidden flex gap-2.5 w-full overflow-x-auto">
        {data?.content?.map((item: NoticeType) => (
          <div key={item.url} className="shrink-0">
            <NoticeCard notice={item} />
          </div>
        ))}
      </div>

      {/* 데스크톱: 4개 카드 그리드 */}
      <div className="hidden lg:flex gap-2.5 w-full justify-center">
        {data?.content?.slice(0, 4).map((item: NoticeType) => (
          <NoticeCard key={item.url} notice={item} />
        ))}
      </div>
    </>
  );
};

const RecommendedAINotice = () => {
  const { data, isLoading } = useGetNoticeRecommend();

  if (isLoading) {
    return (
      <div className="flex gap-2.5 w-full overflow-x-auto lg:overflow-x-visible lg:justify-center">
        {Array.from({ length: 4 }).map((_, idx) => (
          <NoticeSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* 모바일: 스크롤 형태 */}
      <div className="lg:hidden flex gap-2.5 w-full overflow-x-auto">
        {data?.map((item: NoticeType) => (
          <div key={item.url} className="shrink-0">
            <NoticeCard notice={item} />
          </div>
        ))}
      </div>

      {/* 데스크톱: 4개 카드 그리드 */}
      <div className="hidden lg:flex gap-2.5 w-full justify-center">
        {data?.slice(0, 4).map((item: NoticeType) => (
          <NoticeCard key={item.url} notice={item} />
        ))}
      </div>
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
      <div className="flex gap-2.5 w-full overflow-x-auto lg:overflow-x-visible lg:justify-center">
        {Array.from({ length: 4 }).map((_, idx) => (
          <NoticeSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* 모바일: 스크롤 형태 */}
      <div className="lg:hidden flex gap-2.5 w-full overflow-x-auto">
        {data?.content?.map((item: NoticeType) => (
          <div key={item.url} className="shrink-0">
            <NoticeCard notice={item} />
          </div>
        ))}
      </div>

      {/* 데스크톱: 4개 카드 그리드 */}
      <div className="hidden lg:flex gap-2.5 w-full justify-center">
        {data?.content?.slice(0, 4).map((item: NoticeType) => (
          <NoticeCard key={item.url} notice={item} />
        ))}
      </div>
    </>
  );
};

const MainContent = () => {
  const {isLoggedIn} = useAuthStore()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버사이드 렌더링 시에는 기본값 표시
  const sectionTitle = mounted
    ? (isLoggedIn ? "AI 추천 공고" : "R&D 분야 최신 공고")
    : "R&D 분야 최신 공고";

  const sectionPath = mounted
    ? (isLoggedIn ? "/notices/recommend" : "/notices/rnd")
    : "/notices/rnd";

  return (
    <div className="w-full flex justify-center flex-col">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <div className="mb-16">
          <SectionBlock
            title="교육 분야 최신 공고 보러가기"
            path="/notices/education"
          >
            <EducationNotice />
          </SectionBlock>
        </div>

        <div className="mb-16">
          <SectionBlock
            title={sectionTitle}
            path={sectionPath}
          >
            {mounted && isLoggedIn ? <RecommendedAINotice /> : <RnDNotice />}
          </SectionBlock>
        </div>

        <div className="flex justify-center mb-10">
          <BoxMenu />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
