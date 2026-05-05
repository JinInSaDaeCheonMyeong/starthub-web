"use client";
import FoldArrow from "@/shared/ui/FoldArrow";
import { useParams, useRouter } from "next/navigation";
import NoticeCard from "@/shared/ui/NoticeCard";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";
import { useGetNoticeRecommend } from "@/features/notice/getNoticeRecommend/useGetNoticeRecommend";
import { NoticeType } from "@/entities/notice/model/notice.type";

const TYPE_CONFIG = {
  education: {
    title: "교육 분야 최신 공고",
    supportField: "멘토링ㆍ컨설팅ㆍ교육",
    targetRegion: undefined,
  },
  rnd: {
    title: "R&D 분야 최신 공고",
    supportField: "기술개발(R&D)",
    targetRegion: undefined,
  },
  daegu: {
    title: "대구 지역 최신 공고",
    targetRegion: "대구",
    supportField: undefined,
  },
  funding: {
    title: "자금 분야 최신 공고",
    supportField: "자금",
    targetRegion: undefined,
  },
  recommend: {
    title: "AI 추천 공고",
    supportField: undefined,
    targetRegion: undefined,
  },
};

type NoticeTypeParam = keyof typeof TYPE_CONFIG;

const NoticeListUpPage = () => {
  const params = useParams<{ type: NoticeTypeParam }>();
  const router = useRouter();
  const type = params?.type;
  const config = TYPE_CONFIG[type as NoticeTypeParam] || TYPE_CONFIG.recommend;

  const searchData = useGetNoticeSearch({
    supportField: config?.supportField,
    targetRegion: config?.targetRegion,
    page: 0,
    size: 40,
    sort: "createdAt,desc",
  });

  const recommendData = useGetNoticeRecommend();

  const { data, isLoading } = type === "recommend" ? recommendData : searchData;
  const notices =
    type === "recommend" ? (data as NoticeType[]) || [] : (data as any)?.content || [];

  return (
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <FoldArrow title={config.title} />
        <div className="h-full min-h-screen mt-8">
          {/* 모바일: 리스트 형태 */}
          <div className="lg:hidden space-y-3 sm:space-y-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="bg-hub-gray-4 rounded-lg p-4 animate-skeleton-pulse h-16 sm:h-20" />
                ))
              : notices?.map((item: NoticeType) => (
                  <div
                    key={item.url}
                    className="bg-hub-white-1 border border-hub-gray-3 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/notice/${item.id}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-pt-body2-semibold text-hub-black-1 text-sm sm:text-base mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="font-pt-caption1-regular text-hub-gray-2 text-xs sm:text-sm mb-3 overflow-hidden">
                          <span className="line-clamp-3">
                            {item.content && item.content.length > 150
                              ? item.content.substring(0, 150) + "..."
                              : item.content || "내용이 없습니다."}
                          </span>
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-hub-gray-2">
                          <span className="bg-hub-gray-4 px-2 py-1 rounded-md">{item.region || "전국"}</span>
                          <span className="bg-hub-gray-4 px-2 py-1 rounded-md">{item.supportField || "전체 분야"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {/* 데스크톱: NoticeCard 그리드 형태 */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 12 }).map((_, idx) => (
                  <NoticeSkeleton key={idx} />
                ))
              : notices?.map((item: NoticeType) => (
                  <NoticeCard key={item.url} notice={item} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeListUpPage;
