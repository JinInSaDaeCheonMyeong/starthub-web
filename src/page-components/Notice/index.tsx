import SearchNotice from "@/features/notice/ui/searchNotice";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/shared/ui/pagination";
import NoticeCard from "@/shared/ui/NoticeCard";
import { NoticeSearchParams } from "@/entities/notice/model/notice.type";
import { useGetNoticeSearch } from "@/features/notice/getNoticeSearch/useGetNoticeSearch";

const NoticePage = () => {
  const router = useRouter();
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

      <div className="mt-[30px] sm:mt-[40px] md:mt-[50px] w-full px-4 sm:px-4 md:px-6 lg:px-4 xl:px-0 min-h-[50vh] flex justify-center">
        <div className="w-full max-w-[1040px]">
          {isLoading ? (
            <>
              {/* 모바일 스켈레톤: 리스트 형태 */}
              <div className="lg:hidden space-y-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={`skeleton-mobile-${index}`} className="animate-pulse bg-hub-gray-4 h-16 rounded-lg"></div>
                ))}
              </div>

              {/* 데스크톱 스켈레톤: 카드 그리드 형태 */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 xl:grid-cols-4">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div key={`skeleton-card-${index}`} className="animate-pulse bg-hub-gray-4 h-[150px] rounded-lg"></div>
                  ))}
                </div>
              </div>
            </>
          ) : isError ? (
            <p className="font-pt-body1-medium flex justify-center mt-[40px] sm:mt-[50px] md:mt-[60px] text-sm sm:text-base">
              검색 결과가 없습니다.
            </p>
          ) : !data || data.content.length === 0 ? (
            <p className="font-pt-body1-medium flex justify-center mt-[40px] sm:mt-[50px] md:mt-[60px] text-sm sm:text-base">
              검색 조건에 맞는 공고가 없습니다.
            </p>
          ) : (
            <>
              {/* 모바일: 리스트 형태 */}
              <div className="lg:hidden space-y-3">
                {data.content.map((notice, index) => (
                  <div
                    key={`notice-mobile-${notice.id}`}
                    className="bg-hub-white-1 border border-hub-gray-3 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/notice/${notice.id}`)}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-pt-body2-semibold text-hub-black-1 text-sm mb-1 wrap-break-word line-clamp-2">
                          {notice.title}
                        </h3>
                        <p className="font-pt-caption1-regular text-hub-gray-2 text-xs mb-2 overflow-hidden wrap-break-word">
                          <span className="line-clamp-2">
                            {(() => {
                              const cleanContent = notice.content?.replace(/<[^>]*>/g, '') || "내용이 없습니다.";
                              return cleanContent.length > 100
                                ? cleanContent.substring(0, 100) + "..."
                                : cleanContent;
                            })()}
                          </span>
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-hub-gray-2">
                          <span>{notice.receptionPeriod || "미정"}</span>
                          <span>•</span>
                          <span>{notice.region || "전국"}</span>
                        </div>
                      </div>
                      <div className="min-w-0 sm:ml-4 sm:text-right">
                        <div className="font-pt-caption1-medium text-hub-primary text-xs mb-1 wrap-break-word">
                          {notice.supportField || "일반"}
                        </div>
                        <div className="font-pt-caption1-regular text-hub-gray-2 text-xs wrap-break-word">
                          {notice.organization || "기관명 없음"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 데스크톱: NoticeCard 그리드 형태 */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 xl:grid-cols-4">
                  {data.content.map((notice, index) => (
                    <NoticeCard key={`notice-card-${notice.id}`} notice={notice} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
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
