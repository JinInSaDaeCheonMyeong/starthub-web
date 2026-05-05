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
      <div className="w-full mt-10 min-h-[50vh]">
        <p className="font-pt-h2-semibold mb-5">최근 BMC</p>
        <div>로딩 중...</div>
      </div>
    );
  }

  if (bmcList.length === 0) {
    return (
      <div className="w-full mt-10 min-h-[50vh]">
        <p className="font-pt-h2-semibold mb-5">최근 BMC</p>
        <div>생성된 BMC가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="w-full mt-10 min-h-[50vh]">
      <p className="font-pt-h2-semibold mb-5">최근 BMC</p>

      {/* 모바일: 리스트 형태, 데스크탑: 카드 그리드 */}
      <div className="w-full">
        {/* 모바일 리스트 */}
        <div className="block lg:hidden w-full">
          <div className="space-y-3 mb-10">
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
                isMobile={true}
              />
            ))}
          </div>
        </div>

        {/* 데스크탑 카드 그리드 */}
        <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-10">
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
              isMobile={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BmcList;
