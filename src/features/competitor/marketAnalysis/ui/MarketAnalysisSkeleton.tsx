export const MarketAnalysisSkeleton = () => {
  const pulse = "animate-skeleton-pulse";

  return (
    // SkeletonContainer - 반응형
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        {/* SkeletonTitle */}
        <div
          className={`w-[200px] h-6 sm:h-8 bg-hub-gray-4 rounded-lg mb-5 ${pulse}`}
        />

        {/* SkeletonContentWrapper - 반응형 레이아웃 */}
        <div className="flex flex-col lg:flex-row lg:gap-10 w-full">
          {/* SkeletonMainContent */}
          <div className="flex-1 min-w-0">
            {/* BMC Image Skeleton */}
            <div className="w-full max-w-[700px] mb-6 lg:mb-10">
              <div
                className={`w-full h-[200px] sm:h-[300px] bg-hub-gray-4 rounded-[10px] border border-hub-gray-3 ${pulse}`}
              />
            </div>

            {/* BMC Sidebar Skeleton - 모바일에서만 */}
            <div className="lg:hidden w-full mb-6">
              <div
                className={`w-full h-[400px] p-4 border border-hub-gray-3 rounded-[10px] bg-hub-gray-4 ${pulse}`}
              />
            </div>

            {/* User Scale Section */}
            <div className="w-full pb-5 mb-5">
              <div
                className={`w-[150px] h-5 sm:h-6 bg-hub-gray-4 rounded-md mb-5 ${pulse}`}
              />
              {/* 모바일: 세로, 데스크탑: 가로 */}
              <div className="flex flex-col lg:flex-row lg:gap-2.5 gap-5">
                <div
                  className={`w-full lg:flex-1 h-20 bg-hub-gray-4 rounded-[10px] ${pulse}`}
                />
                <div
                  className={`w-full lg:flex-1 h-20 bg-hub-gray-4 rounded-[10px] ${pulse}`}
                />
                <div
                  className={`w-full lg:flex-1 h-20 bg-hub-gray-4 rounded-[10px] ${pulse}`}
                />
              </div>
            </div>

            {/* Competitor Section */}
            <div className="w-full pb-5 mb-5">
              <div
                className={`w-[150px] h-5 sm:h-6 bg-hub-gray-4 rounded-md mb-5 ${pulse}`}
              />
              {/* 모바일: 1열, 데스크탑: 2열 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                <div
                  className={`w-full h-[200px] sm:h-[250px] p-4 border border-hub-gray-3 rounded-lg bg-hub-gray-4 ${pulse}`}
                />
                <div
                  className={`w-full h-[200px] sm:h-[250px] p-4 border border-hub-gray-3 rounded-lg bg-hub-gray-4 ${pulse}`}
                />
              </div>
            </div>

            {/* SkeletonDivider */}
            <div className="w-full h-px mt-5 mb-[30px] bg-hub-gray-3" />

            {/* Insight Section */}
            <div className="w-full pb-5 mb-5">
              <div
                className={`w-[150px] h-5 sm:h-6 bg-hub-gray-4 rounded-md mb-5 ${pulse}`}
              />
              {/* 모바일: 세로, 데스크탑: 가로 */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-[25px] gap-[30px]">
                <div
                  className={`h-[150px] sm:h-[200px] p-4 sm:p-6 rounded-[10px] bg-hub-gray-4 ${pulse}`}
                />
                <div
                  className={`h-[150px] sm:h-[200px] p-4 sm:p-6 rounded-[10px] bg-hub-gray-4 ${pulse}`}
                />
              </div>
            </div>

            {/* SkeletonDivider */}
            <div className="w-full h-px mt-5 mb-[30px] bg-hub-gray-3" />

            {/* Global Expansion Section */}
            <div className="w-full pb-5 mb-5">
              <div
                className={`w-[150px] h-5 sm:h-6 bg-hub-gray-4 rounded-md mb-5 ${pulse}`}
              />
              <div
                className={`w-full h-16 sm:h-20 bg-hub-gray-4 rounded-[10px] mb-2.5 ${pulse}`}
              />
              <div
                className={`w-full h-16 sm:h-20 bg-hub-gray-4 rounded-[10px] mb-2.5 ${pulse}`}
              />
              <div
                className={`w-full h-16 sm:h-20 bg-hub-gray-4 rounded-[10px] mb-2.5 ${pulse}`}
              />
            </div>
          </div>

          {/* SkeletonSidebar - 데스크탑에서만 */}
          <div className="hidden lg:block lg:w-[350px] lg:flex-shrink-0">
            <div
              className={`sticky top-[170px] w-full h-[400px] p-5 border border-hub-gray-3 rounded-[10px] bg-hub-gray-4 ${pulse}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
