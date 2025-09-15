import FoldArrow from "@/shared/ui/FoldArrow";
import Layout from "@/shared/ui/Layout";
import { useParams } from "react-router-dom";
import { useGetNotice } from "@/features/notice/getNotice/useGetNotice";
import NoticeCard from "@/shared/ui/NoticeCard";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import styled from "styled-components";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";

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
      : useGetNotice({
          page: 0,
          size: 20,
          sort: "createdAt,desc",
        });

  const skeletonCount = data?.content.length || 8;

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
          : data?.content.map((item) => (
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
