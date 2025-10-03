import React, { useState } from "react";
import SideBar from "@/features/profile/users/sideBar";
import NoticeCard from "@/shared/ui/NoticeCard";
import { ReactComponent as LikeIcon } from "@/assets/icons/LikeIcon.svg";
import { useGetLikedAnnouncements } from "@/features/notice/getLikedAnnouncements/useGetLikedAnnouncements";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import Pagination from "@/shared/ui/pagination";
import * as S from "./style";
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
  const {isLoggedIn} = useAuthStore();

  return (
    <S.Wrapper>
      <SideBar />
      {isLoggedIn ? (
        <S.ContentArea>
          <div>
            <LikeIcon
              style={{ width: "25px", height: "25px" }}
              aria-label="좋아요 아이콘"
            />
            <S.Title>좋아요 누른 공고</S.Title>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
              {isLoading ? (
                <S.NoticeGrid>
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <NoticeSkeleton key={idx} />
                  ))}
                </S.NoticeGrid>
              ) : isError ? (
                <S.ErrorContainer>
                  <S.ErrorText>
                    좋아요한 공고를 불러오는 중 오류가 발생했습니다.
                  </S.ErrorText>
                  <button
                    onClick={() => refetch()}
                    style={{
                      marginTop: "10px",
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    다시 시도
                  </button>
                </S.ErrorContainer>
              ) : notices.length === 0 ? (
                <S.EmptyContainer>
                  <S.EmptyText>좋아요를 추가해보세요!</S.EmptyText>
                </S.EmptyContainer>
              ) : (
                <S.NoticeGrid>
                  {notices.map((notice) => (
                    <NoticeCard key={notice.url} notice={notice} />
                  ))}
                </S.NoticeGrid>
              )}
            </div>
            {data && data.totalPages > 1 && (
              <S.PaginationWrapper>
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </S.PaginationWrapper>
            )}
          </div>
        </S.ContentArea>
      ) : (
        <NotMyPage />
      )}
    </S.Wrapper>
  );
};

export default LikeListForm;