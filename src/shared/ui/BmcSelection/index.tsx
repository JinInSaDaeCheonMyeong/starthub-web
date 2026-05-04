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
    <div className="w-[1025px] mt-10 mr-10 mb-20">
      <p className="font-pt-body1-medium mb-5">
        먼저 원하는 BMC를 선택해 주세요.
      </p>
      <div className="grid grid-cols-4 gap-[30px] w-[1024px] [&_img]:w-[242px] [&_img]:h-[170px] [&_img]:rounded-[10px] [&_img]:border [&_img]:border-hub-gray-3 [&_img:hover]:opacity-50 [&_img:hover]:cursor-pointer">
        {canvases.map((canvas) => (
          <BmcCard
            key={canvas.id}
            bmcId={Number(canvas.id)}
            title={canvas.title}
            date={new Date(canvas.createdAt).toLocaleDateString("ko-KR")}
          />
        ))}
      </div>
    </div>
  );
};

export default BmcList;
