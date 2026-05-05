export const BmcSelectionSkeleton = () => {
  return (
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <p className="font-pt-body1-medium mb-5">
          먼저 원하는 BMC를 선택해 주세요.
        </p>

        {/* 모바일: 리스트, 데스크탑: 카드 그리드 */}
        <div className="w-full">
          {/* 모바일 리스트 스켈레톤 */}
          <div className="block lg:hidden w-full">
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white border border-hub-gray-3 rounded-lg">
                  <div className="flex-1">
                    <div className="w-[150px] h-4 bg-hub-gray-4 rounded animate-skeleton-pulse mb-2" />
                    <div className="w-[100px] h-3 bg-hub-gray-4 rounded animate-skeleton-pulse" />
                  </div>
                  <div className="ml-4 w-6 h-6 bg-hub-gray-4 rounded animate-skeleton-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* 데스크탑 카드 그리드 스켈레톤 */}
          <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex flex-col w-full max-w-[242px] mx-auto">
                <div className="w-full aspect-[242/170] bg-hub-gray-4 rounded-[10px] border border-hub-gray-3 animate-skeleton-pulse" />
                <div className="p-3">
                  <div className="w-[150px] h-4 bg-hub-gray-4 rounded animate-skeleton-pulse mb-2" />
                  <div className="w-[100px] h-3 bg-hub-gray-4 rounded animate-skeleton-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
