"use client";
import React from "react";
import { ReactComponent as Plus } from "@assets/icons/plus.svg";
import { useRouter } from "next/navigation";
import { useGetCompetitorAnalyses } from "@/features/competitor/getCompetitorAnalyses/useGetCompetitorAnalyses";
import { CompetitorCardSkeleton } from "./CompetitorCardSkeleton";
import { bmcApi } from "@/entities/bmc/api/bmc";
import { BmcData } from "@/entities/bmc/model/types";
import BmcCard from "@/shared/ui/BmcCard";

const formatDate = (dateString?: string): string => {
  const date = dateString ? new Date(dateString) : new Date();
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, ".")
    .replace(/\s/g, "");
};

const CompetitorTemplateCard: React.FC = () => {
  const router = useRouter();
  const { data: analysesData, isLoading, refetch } = useGetCompetitorAnalyses();
  const [bmcList, setBmcList] = React.useState<BmcData[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    refetch();
    const handleFocus = () => refetch();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refetch]);

  React.useEffect(() => {
    const fetchBmcList = async () => {
      try {
        const response = await bmcApi.getCanvases();
        setBmcList(response.data);
      } catch (error) {
        console.error("BMC 리스트 조회 실패:", error);
      }
    };
    fetchBmcList();
  }, []);

  const handleCardClick = (bmcId: number) => {
    if (!analysesData) return;
    const selectedAnalysis = analysesData.data.find(
      (item) => item.bmcId === bmcId,
    );
    if (selectedAnalysis)
      router.push(`/competitor/analysis?bmcId=${String(bmcId)}`);
  };

  const cardData = React.useMemo(() => {
    if (!analysesData?.data) return [];

    const sortedData = [...analysesData.data].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    const uniqueByBmcId = new Map();
    sortedData.forEach((item) => {
      if (!uniqueByBmcId.has(item.bmcId)) uniqueByBmcId.set(item.bmcId, item);
    });

    return Array.from(uniqueByBmcId.values()).map((item) => {
      const bmcData = bmcList.find((bmc) => bmc.id === item.bmcId);
      return {
        bmcId: item.bmcId,
        title: item.userBmc.title,
        date: formatDate(item.createdAt),
        imageUrl: bmcData?.imageUrl || item.userBmc.imageUrl,
      };
    });
  }, [analysesData, bmcList]);

  if (isLoading) return <CompetitorCardSkeleton />;

  // hydration 방지를 위해 mounted 상태 확인
  if (!mounted) {
    return <CompetitorCardSkeleton />;
  }

  return (
    <div className="w-full min-h-[50vh]">
      <div className="flex flex-col justify-start items-start w-full gap-6">
        {/* 타이틀 */}
        <div className="flex flex-col justify-start items-start w-full">
          <p className="font-pt-body1-medium">
            경쟁사분석 기능을 사용해보세요!
          </p>
        </div>

        {/* 모바일: 리스트 형태, 데스크탑: 카드 그리드 */}
        <div className="w-full">
          {/* 모바일 리스트 */}
          <div className="block lg:hidden w-full">
            {/* 새로 만들기 버튼 - 항상 표시 */}
            <button
              onClick={() => router.push("/competitor/bmc-selection")}
              className="w-full mb-4 p-4 text-white rounded-lg font-pt-body2-medium transition-colors"
              style={{ backgroundColor: '#2466F4' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a4db3'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2466F4'; }}
            >
              경쟁사 분석 생성하기
            </button>

            {/* 리스트 아이템들 */}
            {cardData.length > 0 ? (
              <div className="space-y-3">
                {cardData.map((card) => (
                  <div
                    key={card.bmcId}
                    onClick={() => handleCardClick(card.bmcId)}
                    className="flex items-center justify-between p-4 bg-white border border-hub-gray-3 rounded-lg cursor-pointer hover:bg-hub-gray-4 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-pt-body2-medium text-hub-black-1 mb-1">
                        {card.title}
                      </h3>
                      <p className="font-pt-caption2-regular text-hub-gray-2">
                        {card.date}
                      </p>
                    </div>
                    <button className="ml-4 p-2 text-hub-gray-2 hover:text-hub-black-1">
                      ⋯
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="font-pt-body2-regular text-hub-gray-2">
                  아직 생성된 경쟁사 분석이 없습니다.
                </p>
                <p className="font-pt-caption2-regular text-hub-gray-2 mt-2">
                  위의 버튼을 눌러 새로운 분석을 시작해보세요!
                </p>
              </div>
            )}
          </div>

          {/* 데스크탑 카드 그리드 */}
          <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
            {/* 추가 버튼 카드 */}
            <div
              onClick={() => router.push("/competitor/bmc-selection")}
              className="inline-block bg-hub-white-1 cursor-pointer w-full max-w-[242px] h-[168px] mx-auto transition-all duration-300 hover:opacity-50"
            >
              <div className="flex items-center justify-center w-full h-[168px] border border-hub-gray-3 rounded-[10px] [&_svg]:w-[70px] [&_svg]:h-[70px] [&_svg]:fill-hub-primary">
                <Plus />
              </div>
            </div>

            {cardData.map((card) => (
              <BmcCard
                key={card.bmcId}
                id={card.bmcId}
                title={card.title}
                date={card.date}
                imageUrl={card.imageUrl}
                type="competitor"
                onCardClick={() => handleCardClick(card.bmcId)}
                onDelete={refetch}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorTemplateCard;
