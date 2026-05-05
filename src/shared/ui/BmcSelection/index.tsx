import { useQuery } from "@tanstack/react-query";
import { bmcApi } from "@/entities/bmc/api/bmc";
import BmcCard from "../CompetitorBmcCard";
import { BmcSelectionSkeleton } from "./BmcSelectionSkeleton";

const BmcList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bmc", "canvases"],
    queryFn: bmcApi.getCanvases,
  });

  if (isLoading) return <BmcSelectionSkeleton />;

  if (error) {
    return (
      <div className="w-[1025px] mt-10 mr-10 mb-20">
        <p className="font-pt-body1-medium mb-5">
          BMC 목록을 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

  const canvases = data?.data || [];

  return (
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <p className="font-pt-body1-medium mb-5">
          먼저 원하는 BMC를 선택해 주세요.
        </p>

        {/* 모바일: 리스트, 데스크탑: 카드 그리드 */}
        <div className="w-full">
          {/* 모바일 리스트 */}
          <div className="block lg:hidden w-full">
            <div className="space-y-3">
              {canvases.map((canvas) => (
                <BmcCard
                  key={canvas.id}
                  bmcId={Number(canvas.id)}
                  title={canvas.title}
                  date={new Date(canvas.createdAt).toLocaleDateString("ko-KR")}
                  isMobile={true}
                />
              ))}
            </div>
          </div>

          {/* 데스크탑 카드 그리드 */}
          <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
            {canvases.map((canvas) => (
              <BmcCard
                key={canvas.id}
                bmcId={Number(canvas.id)}
                title={canvas.title}
                date={new Date(canvas.createdAt).toLocaleDateString("ko-KR")}
                isMobile={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmcList;
