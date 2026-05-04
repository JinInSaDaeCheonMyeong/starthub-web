"use client";
import FoldArrow from "@/shared/ui/FoldArrow";
import { useParams } from "next/navigation";
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
  const type = params?.type;
  const config = TYPE_CONFIG[type as NoticeTypeParam] || TYPE_CONFIG.recommend;

  const searchData = useGetNoticeSearch({
    supportField: config?.supportField,
    targetRegion: config?.targetRegion,
    page: 0,
    size: 20,
    sort: "createdAt,desc",
  });

  const recommendData = useGetNoticeRecommend();

  const { data, isLoading } = type === "recommend" ? recommendData : searchData;
  const notices =
    type === "recommend" ? (data as NoticeType[]) : (data as any)?.content;

  return (
    <>
      <FoldArrow title={config.title} />
      <div className="h-full min-h-screen">
        <div className="grid grid-cols-4 gap-5 m-5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <NoticeSkeleton key={idx} />
              ))
            : notices?.map((item: NoticeType) => (
                <NoticeCard key={item.url} notice={item} />
              ))}
        </div>
      </div>
    </>
  );
};

export default NoticeListUpPage;
