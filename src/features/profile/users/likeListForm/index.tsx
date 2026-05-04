import React, { useState } from "react";
import SideBar from "@/features/profile/users/sideBar";
import NoticeCard from "@/shared/ui/NoticeCard";
import { ReactComponent as LikeIcon } from "@/assets/icons/LikeIcon.svg";
import { useGetLikedAnnouncements } from "@/features/notice/getLikedAnnouncements/useGetLikedAnnouncements";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import Pagination from "@/shared/ui/pagination";
import NotMyPage from "../profileForm/ui/NotMyPage";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

const LikeListForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetLikedAnnouncements({
    page: currentPage - 1,
    size: 12,
    sort: "createdAt,desc",
  });

  const notices = data?.content || [];
  const { isLoggedIn } = useAuthStore();

  return (
    // Wrapper
    <div className="flex w-full box-border pr-[160px] pl-[200px] h-full">
      <SideBar />

      {isLoggedIn ? (
        // ContentArea
        <div className="flex flex-col justify-between flex-1 pt-[50px] pr-5 pb-5 pl-[60px]">
          <div>
            <LikeIcon
              className="w-[25px] h-[25px]"
              aria-label="좋아요 아이콘"
            />
            {/* Title */}
            <p className="font-pt-h1-semibold text-hub-black-1 mb-6 mt-2.5 flex items-center">
              좋아요 누른 공고
            </p>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              {isLoading ? (
                // NoticeGrid
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <NoticeSkeleton key={idx} />
                  ))}
                </div>
              ) : isError ? (
                // ErrorContainer
                <div className="flex flex-col items-center justify-center h-[200px] p-5">
                  <p className="font-pt-body1-regular text-hub-error mb-2.5">
                    좋아요한 공고를 불러오는 중 오류가 발생했습니다.
                  </p>
                  <button
                    onClick={() => refetch()}
                    className="mt-2.5 py-2 px-4 bg-[#007bff] text-white border-none rounded cursor-pointer"
                  >
                    다시 시도
                  </button>
                </div>
              ) : notices.length === 0 ? (
                // EmptyContainer
                <div className="flex justify-center items-center h-[200px]">
                  <p className="font-pt-body1-regular text-hub-primary">
                    좋아요를 추가해보세요!
                  </p>
                </div>
              ) : (
                // NoticeGrid
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                  {notices.map((notice) => (
                    <NoticeCard key={notice.url} notice={notice} />
                  ))}
                </div>
              )}
            </div>

            {data && data.totalPages > 1 && (
              // PaginationWrapper
              <div className="flex justify-center w-full">
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <NotMyPage />
      )}
    </div>
  );
};

export default LikeListForm;
