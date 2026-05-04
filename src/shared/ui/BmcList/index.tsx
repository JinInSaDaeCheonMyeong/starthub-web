import { useEffect, useState } from "react";
import { bmcApi } from "@/entities/bmc/api/bmc";
import { BmcData } from "@/entities/bmc/model/types";
import BmcCard from "../BmcCard";

const BmcList = () => {
  const [bmcList, setBmcList] = useState<BmcData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBmcList = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const response = await bmcApi.getCanvases();
      const sortedList = response.data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setBmcList(sortedList);
    } catch (error) {
      console.error("BMC 리스트 조회 실패:", error);
      setBmcList([]);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBmcList();
  }, []);

  if (isLoading) {
    return (
      <div className="w-[1024px] mt-10 min-h-[50vh]">
        <p className="font-pt-h2-semibold mb-5">최근 BMC</p>
        <div>로딩 중...</div>
      </div>
    );
  }

  if (bmcList.length === 0) {
    return (
      <div className="w-[1024px] mt-10 min-h-[50vh]">
        <p className="font-pt-h2-semibold mb-5">최근 BMC</p>
        <div>생성된 BMC가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="w-[1024px] mt-10 min-h-[50vh]">
      <p className="font-pt-h2-semibold mb-5">최근 BMC</p>
      <div className="grid grid-cols-4 gap-5 mb-10 max-w-[1024px] [&_img]:w-[242px] [&_img]:h-[170px] [&_img]:rounded-[10px] [&_img]:border [&_img]:border-hub-gray-3 [&_img:hover]:opacity-50 [&_img:hover]:cursor-pointer">
        {bmcList.map((bmc) => (
          <BmcCard
            key={bmc.id}
            id={bmc.id}
            title={bmc.title}
            date={
              bmc.createdAt
                ? new Date(bmc.createdAt).toLocaleDateString("ko-KR")
                : ""
            }
            imageUrl={bmc.imageUrl}
            type="bmc"
            onDelete={() => fetchBmcList(false)}
          />
        ))}
      </div>
    </div>
  );
};

export default BmcList;
