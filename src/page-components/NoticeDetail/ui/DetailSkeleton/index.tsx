export default function DetailSkeleton() {
  return (
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[150px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <div className="w-full">
          <div className="border-b border-[#dadada] pb-4 sm:pb-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              <div className="w-24 h-5 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              <div className="w-20 h-6 bg-hub-gray-3 rounded animate-skeleton-pulse" />
            </div>

            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <div className="w-full h-8 bg-hub-gray-3 rounded animate-skeleton-pulse mb-2" />
                <div className="w-3/4 h-8 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
              <div className="w-8 h-8 bg-hub-gray-3 rounded animate-skeleton-pulse mt-1" />
            </div>

            <div className="w-64 h-5 bg-hub-gray-3 rounded animate-skeleton-pulse" />
          </div>

          <div className="space-y-8">
            <div>
              <div className="w-2/3 h-7 bg-hub-gray-3 rounded animate-skeleton-pulse mb-4" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-11/12 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-4/5 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-3/4 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
            </div>

            <div>
              <div className="w-1/2 h-6 bg-hub-gray-3 rounded animate-skeleton-pulse mb-4" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-5/6 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-4/5 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
            </div>

            <div>
              <div className="w-3/5 h-6 bg-hub-gray-3 rounded animate-skeleton-pulse mb-4" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-11/12 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-5/6 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-3/4 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-2/3 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
            </div>

            <div>
              <div className="w-2/5 h-6 bg-hub-gray-3 rounded animate-skeleton-pulse mb-4" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-10/12 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
                <div className="w-4/5 h-4 bg-hub-gray-3 rounded animate-skeleton-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
