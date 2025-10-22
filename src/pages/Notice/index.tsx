import Layout from "@/shared/ui/Layout";
import SearchNotice from "@/features/notice/ui/searchNotice";
import { useState, useEffect } from "react";
import NoticeCard from "@/shared/ui/NoticeCard";
import * as S from "./style";
import Pagination from "@/shared/ui/pagination";
import { NoticeSearchParams } from "@/entities/notice/model/notice.type";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";

const NoticePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Omit<NoticeSearchParams, "page" | "size">>({});

  const { data, isLoading, isError } = useGetNoticeSearch({
    ...filters,
    page: currentPage - 1,
    size: 16,
    sort: "createdAt,desc",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleFilterChange = (
    newFilters: Omit<NoticeSearchParams, "page" | "size">
  ) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const shouldHideFilters = data?.content?.[0]?.isNatural === true;

  return (
    <Layout>
      <SearchNotice onFilterChange={handleFilterChange} hideFilters={shouldHideFilters} />

      <S.NoticeContentContainer>
        {isLoading ? (
          <S.CardWrap>
            {Array.from({ length: 16 }).map((_, index) => (
              <NoticeSkeleton key={`skeleton-${index}`} />
            ))}
          </S.CardWrap>
        ) : isError ? (
          <S.ExceptionMessage>
            검색 결과가 없습니다.
          </S.ExceptionMessage>
        ) : !data || data.content.length === 0 ? (
          <S.ExceptionMessage>
            검색 조건에 맞는 공고가 없습니다.
          </S.ExceptionMessage>
        ) : (
          <S.CardWrap>
            {data.content.map((notice, index) => (
              <NoticeCard key={`notice-${index}`} notice={notice} />
            ))}
          </S.CardWrap>
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