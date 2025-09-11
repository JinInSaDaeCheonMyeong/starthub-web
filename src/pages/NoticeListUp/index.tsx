import FoldArrow from "@/shared/ui/FoldArrow";
import Layout from "@/shared/ui/Layout";
import { useParams } from "react-router-dom";
import { useGetNotice } from "@/features/notice/getNotice/useGetNotice";
import NoticeCard from "@/shared/ui/NoticeCard";
import styled from "styled-components";

const NoticeListUpPage = () => {
  const { type } = useParams();

  const { data } = useGetNotice({
    page: 0,
    size: 20,
    sort: [],
  });

  return (
    <Layout>
      <FoldArrow
        title={
          type === "software" ? "IT/소프트웨어 분야 최신 공고" : "AI 추천 공고"
        }
      />
      <div style={{ marginBottom: "20px" }} />
      <NoticeListContainer>
        {data?.content.map((item) => (
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
