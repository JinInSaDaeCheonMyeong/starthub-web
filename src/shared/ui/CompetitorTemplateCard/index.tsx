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

  React.useEffect(() => {
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
          {/* 추가 버튼 카드 */}
          <div
            onClick={() => router.push("/competitor/bmc-selection")}
            className="inline-block bg-hub-white-1 cursor-pointer w-[242px] h-[168px] mb-[50px] transition-all duration-300 hover:opacity-50"
          >
            <div className="flex items-center justify-center w-[242px] h-[168px] border border-hub-gray-3 rounded-[10px] [&_svg]:w-[70px] [&_svg]:h-[70px] [&_svg]:fill-hub-primary">
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
  );
};

export default CompetitorTemplateCard;
