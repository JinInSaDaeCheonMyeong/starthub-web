export const BmcSelectionSkeleton = () => {
  return (
    <div className="w-[1025px] mt-10 mr-10 mb-20">
      <p className="font-pt-body1-medium mb-5">
        먼저 원하는 BMC를 선택해 주세요.
      </p>
      <div className="grid grid-cols-4 gap-[30px] w-[1024px]">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col">
            <div className="w-[242px] h-[170px] rounded-[10px] border border-hub-gray-3 animate-skeleton-pulse" />
            <div className="w-[150px] h-4 mt-2 rounded animate-skeleton-pulse" />
            <div className="w-[100px] h-3 mt-1 rounded animate-skeleton-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
