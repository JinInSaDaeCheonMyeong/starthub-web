const BmcGeneratingSkeleton = () => {
  return (
    <div className="w-full h-full bg-hub-white-1 p-4 sm:p-6 lg:p-8">
      <div className="
        grid gap-3 mb-8 sm:mb-10 lg:mb-12
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-5 lg:grid-rows-[minmax(200px,auto)_minmax(150px,auto)_minmax(120px,auto)]
      ">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className="border-2 border-hub-gray-4 rounded-xl p-4 sm:p-5 lg:p-6 bg-hub-white-1 min-h-[150px] sm:min-h-[180px] lg:min-h-[200px]"
            style={{
              gridArea:
                index === 0
                  ? "1 / 1 / 3 / 2"
                  : index === 1
                    ? "1 / 2 / 2 / 3"
                    : index === 2
                      ? "1 / 3 / 3 / 4"
                      : index === 3
                        ? "1 / 4 / 2 / 5"
                        : index === 4
                          ? "1 / 5 / 3 / 6"
                          : index === 5
                            ? "2 / 2 / 3 / 3"
                            : index === 6
                              ? "2 / 4 / 3 / 5"
                              : index === 7
                                ? "3 / 1 / 4 / 4"
                                : "3 / 4 / 4 / 6",
            }}
          >
            <div className="w-3/5 h-5 sm:h-6 rounded-md mb-3 sm:mb-4 animate-skeleton-pulse" />
            <div className="w-[80%] h-3 sm:h-4 rounded mb-2 animate-skeleton-pulse" />
            <div className="w-[70%] h-3 sm:h-4 rounded mb-2 animate-skeleton-pulse" />
            <div className="w-[90%] h-3 sm:h-4 rounded animate-skeleton-pulse" />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 bg-hub-white-1 rounded-2xl shadow-md">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-hub-gray-4 border-t-hub-primary rounded-full animate-spin mb-4 sm:mb-6" />
        <div className="font-pt-h2-semibold text-hub-black-1 text-center mb-2 text-sm sm:text-base lg:text-lg">
          스타트허브 AI가 BMC를 생성하고 있습니다...
        </div>
        <div className="font-pt-body1-regular text-hub-gray-2 text-center text-xs sm:text-sm lg:text-base">
          잠시만 기다려주세요.
        </div>
      </div>
    </div>
  );
};

export default BmcGeneratingSkeleton;