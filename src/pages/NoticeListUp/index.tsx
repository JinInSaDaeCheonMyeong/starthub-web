import FoldArrow from "@/shared/ui/FoldArrow";
import Layout from "@/shared/ui/Layout";
import { useParams } from "react-router-dom";
import NoticeCard from "@/shared/ui/NoticeCard";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import styled from "styled-components";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";
import { useGetNoticeRecommend } from "@/features/notice/getNoticeRecommend/useGetNoticeRecommend";
import { NoticeType } from "@/entities/notice/model/notice.type";

const NoticeListUpPage = () => {
  const { type } = useParams();

  const { data, isLoading } =
    type === "education"
      ? useGetNoticeSearch({
          supportField: "멘토링ㆍ컨설팅ㆍ교육",
          page: 0,
          size: 20,
          sort: "createdAt,desc",
        })
      : useGetNoticeRecommend();

  const notices = type === "education" ? (data as any)?.content : (data as NoticeType[]);

  const skeletonCount = notices?.length || 8;

  return (
    <Layout>
      <FoldArrow
        title={type === "education" ? "교육 분야 최신 공고" : "AI 추천 공고"}
      />
      <div style={{ marginBottom: "20px" }} />
      <NoticeListContainer>
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <NoticeSkeleton key={idx} />
            ))
          : notices?.map((item: NoticeType) => (
              <NoticeCard key={item.url} notice={item} />
            ))}
      </NoticeListContainer>
    </Layout>
  );
};

export default NoticeListUpPage;

const NoticeListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;
