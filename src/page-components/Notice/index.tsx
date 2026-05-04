import SearchNotice from "@/features/notice/ui/searchNotice";
import { useState, useEffect, useCallback } from "react";
import NoticeCard from "@/shared/ui/NoticeCard";
import Pagination from "@/shared/ui/pagination";
import { NoticeSearchParams } from "@/entities/notice/model/notice.type";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";

const NoticePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<
    Omit<NoticeSearchParams, "page" | "size">
  >({});

  const { data, isLoading, isError } = useGetNoticeSearch({
    ...filters,
    page: currentPage - 1,
    size: 16,
    sort: "createdAt,desc",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleFilterChange = useCallback(
    (newFilters: Omit<NoticeSearchParams, "page" | "size">) => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    [],
  );

  const shouldHideFilters = data?.content?.[0]?.isNatural === true;

  return (
    <>
      <SearchNotice
        onFilterChange={handleFilterChange}
        hideFilters={shouldHideFilters}
      />

      <div className="mt-[50px] w-full px-[200px] min-h-[50vh]">
        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,_250px)] justify-between gap-y-5 w-full">
            {Array.from({ length: 16 }).map((_, index) => (
              <NoticeSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : isError ? (
          <p className="font-pt-body1-medium flex justify-center mt-[60px]">
            검색 결과가 없습니다.
          </p>
        ) : !data || data.content.length === 0 ? (
          <p className="font-pt-body1-medium flex justify-center mt-[60px]">
            검색 조건에 맞는 공고가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,_250px)] justify-between gap-y-5 w-full">
            {data.content.map((notice, index) => (
              <NoticeCard key={`notice-${index}`} notice={notice} />
            ))}
          </div>
        )}
      </div>

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default NoticePage;
