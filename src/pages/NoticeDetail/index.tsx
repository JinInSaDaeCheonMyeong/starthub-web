"use client";
import { useParams } from "next/navigation";
import { useGetNoticeDetail } from "@/features/notice/getNoticeDetail/useGetNoticeDetail";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import DetailContent from "./ui/DetailContent";
import DetailSkeleton from "./ui/DetailSkeleton";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const noticeId = parseInt(id!, 10);

  const { isLoggedIn } = useAuthStore();

  const { data, isLoading } = useGetNoticeDetail(noticeId, isLoggedIn);

  return (
    <>
      {isLoading ? (
        <DetailSkeleton />
      ) : data ? (
        <DetailContent item={data} />
      ) : (
        <></>
      )}
    </>
  );
};

export default NoticeDetailPage;
