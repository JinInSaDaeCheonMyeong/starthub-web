export const MarketAnalysisSkeleton = () => {
  const pulse = "animate-skeleton-pulse";
  const sectionClass = "max-w-[700px] pb-5 mb-5";

  return (
    // SkeletonContainer
    <div className="flex flex-col items-start px-[200px] w-full box-border">
      {/* SkeletonTitle */}
      <div
        className={`w-[200px] h-8 bg-hub-gray-4 rounded-lg mb-10 ${pulse}`}
      />

      {/* SkeletonContentWrapper */}
      <div className="flex gap-10 w-full max-w-[1400px]">
        {/* SkeletonMainContent */}
        <div className="flex-1 min-w-0">
          {/* User Scale Section */}
          <div className={sectionClass}>
            <div
              className={`w-[150px] h-6 bg-hub-gray-4 rounded-md mb-5 ${pulse}`}
            />
            <div
              className={`w-full h-20 bg-hub-gray-4 rounded-[10px] mb-2.5 ${pulse}`}
            />
            <div
              className={`w-full h-20 bg-hub-gray-4 rounded-[10px] mb-2.5 ${pulse}`}
            />
            <div
              className={`w-full h-20 bg-hub-gray-4 rounded-[10px] mb-2.5 ${pulse}`}
            />
          </div>

          {/* Competitor Section */}
          <div className={sectionClass}>
            <div
              className={`w-[150px] h-6 bg-hub-gray-4 rounded-md mb-5 ${pulse}`}
            />
            <div className="flex flex-wrap gap-5 justify-start w-[700px] mb-5">
              <div
                className={`w-[340px] h-[300px] p-5 border border-hub-gray-3 rounded-lg box-border bg-hub-gray-4 ${pulse}`}
              />
              <div
                className={`w-[340px] h-[300px] p-5 border border-hub-gray-3 rounded-lg box-border bg-hub-gray-4 ${pulse}`}
              />
            </div>
            <div className="flex flex-wrap gap-5 justify-start w-[700px] mb-5">
              <div
                className={`w-[340px] h-[300px] p-5 border border-hub-gray-3 rounded-lg box-border bg-hub-gray-4 ${pulse}`}
              />
              <div
                className={`w-[340px] h-[300px] p-5 border border-hub-gray-3 rounded-lg box-border bg-hub-gray-4 ${pulse}`}
              />
            </div>
          </div>

          {/* SkeletonDivider */}
          <div className="w-[700px] h-px mt-5 mb-[30px] bg-hub-gray-3 self-start" />

          {/* Insight Section */}
          <div className={sectionClass}>
            <div
              className={`w-[150px] h-6 bg-hub-gray-4 rounded-md mb-5 ${pulse}`}
            />
            <div className="grid grid-cols-2 gap-[25px] mb-[30px]">
              <div
                className={`h-[200px] p-6 rounded-[10px] bg-hub-gray-4 ${pulse}`}
              />
              <div
                className={`h-[200px] p-6 rounded-[10px] bg-hub-gray-4 ${pulse}`}
              />
            </div>
          </div>

          {/* SkeletonDivider */}
          <div className="w-[700px] h-px mt-5 mb-[30px] bg-hub-gray-3 self-start" />

          {/* Global Expansion Section */}
          <div className={sectionClass}>
            <div
              className={`w-[150px] h-6 bg-hub-gray-4 rounded-md mb-5 ${pulse}`}
            />
            <div
              className={`w-full h-20 bg-hub-gray-4 rounded-[10px] mb-2.5 ${pulse}`}
            />
            <div
              className={`w-full h-20 bg-hub-gray-4 rounded-[10px] mb-2.5 ${pulse}`}
            />
          </div>
        </div>

        {/* SkeletonSidebar */}
        <div
          className={`sticky top-5 w-[300px] flex-shrink-0 h-[500px] p-5 border border-hub-gray-3 rounded-[10px] bg-hub-gray-4 self-start ${pulse}`}
        />
      </div>
    </div>
  );
};
