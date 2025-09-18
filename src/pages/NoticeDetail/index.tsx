import { useParams } from "react-router-dom";
import { useGetNoticeDetail } from "@/features/notice/getNoticeDetail/useGetNoticeDetail";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import Layout from "@/shared/ui/Layout";
import DetailContent from "./ui/DetailContent";
import DetailSkeleton from "./ui/DetailSkeleton";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const noticeId = parseInt(id!, 10);

  const { isLoggedIn } = useAuthStore();

  const { data, isLoading } = useGetNoticeDetail(noticeId, isLoggedIn);

  return (
    <Layout>
      {isLoading ? (
        <DetailSkeleton />
      ) : data ? (
        <DetailContent item={data} />
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default NoticeDetailPage;
