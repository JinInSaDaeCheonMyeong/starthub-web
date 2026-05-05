export const CompetitorCardSkeleton = () => {
  return (
    <div className="w-[1025px] mt-10 mr-10 mb-20 min-h-[50vh]">
      <div className="flex flex-col justify-start items-start w-full gap-6">
        {/* 타이틀 */}
        <div className="flex flex-col justify-start items-start w-full">
          <p className="font-pt-body1-medium">
            경쟁사분석 기능을 사용해보세요!
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-4 gap-[30px] w-full">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="inline-block w-[242px] mb-[50px]">
              <div className="w-[242px] h-[168px] border border-hub-gray-3 rounded-[10px] animate-skeleton-pulse" />
              <div className="w-[120px] h-4 mt-[5px] ml-0 rounded-[10px] animate-skeleton-pulse" />
              <div className="w-[80px] h-3 mt-0 rounded-[10px] animate-skeleton-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
