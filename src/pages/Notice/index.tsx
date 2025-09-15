import Layout from "@/shared/ui/Layout";
import SearchNotice from "@/features/notice/ui/searchNotice";
import { useState } from "react";
import NoticeCard from "@/shared/ui/NoticeCard";
import * as S from "./style";
import Pagination from "@/shared/ui/pagination";
import { NoticeSearchParams } from "@/entities/notice/model/notice.type";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";

const NoticePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<
    Omit<NoticeSearchParams, "page" | "size">
  >({});

  const { data, isLoading, isError } = useGetNoticeSearch({
    ...filters,
    page: currentPage - 1, // API가 0-based라면 이렇게
    size: 16,
    sort: "createdAt,desc",
  });

  const handleFilterChange = (
    newFilters: Omit<NoticeSearchParams, "page" | "size">
  ) => {
    setFilters(newFilters);
    setCurrentPage(1); // 필터 바뀌면 첫 페이지로 초기화
  };

  return (
    <Layout>
      <SearchNotice onFilterChange={handleFilterChange} />

      <S.NoticeContentContainer>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : isError ? (
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        ) : !data || data.content.length === 0 ? (
          <p>검색 조건에 맞는 공고가 없습니다.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data.content.map((notice, index) => (
              <NoticeCard key={`notice-${index}`} notice={notice} />
            ))}
          </div>
        )}
      </S.NoticeContentContainer>

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Layout>
  );
};

export default NoticePage;
