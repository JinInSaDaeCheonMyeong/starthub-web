import FoldArrow from "@/shared/ui/FoldArrow";
import Layout from "@/shared/ui/Layout";
import { useParams } from "react-router-dom";
import NoticeCard from "@/shared/ui/NoticeCard";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import styled from "styled-components";
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
  const { type } = useParams<{ type: NoticeTypeParam }>();
  const config = TYPE_CONFIG[type || "recommend"];

  const searchData = useGetNoticeSearch({
    supportField: config.supportField,
    targetRegion: config.targetRegion,
    page: 0,
    size: 20,
    sort: "createdAt,desc",
  });

  const recommendData = useGetNoticeRecommend();

  const { data, isLoading } = type === "recommend" ? recommendData : searchData;
  const notices =
    type === "recommend" ? (data as NoticeType[]) : (data as any)?.content;

  return (
    <Layout>
      <FoldArrow title={config.title} />
      <div style={{ height: "100%", minHeight:"100vh" }}>
        <NoticeListContainer>
          {isLoading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <NoticeSkeleton key={idx} />
              ))
            : notices?.map((item: NoticeType) => (
                <NoticeCard key={item.url} notice={item} />
              ))}
        </NoticeListContainer>
      </div>
    </Layout>
  );
};

export default NoticeListUpPage;

const NoticeListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px 0px;
`;
