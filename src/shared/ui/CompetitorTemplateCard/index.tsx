import React from "react";
import * as S from "./style";
import { ReactComponent as Plus } from "@assets/icons/plus.svg";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { data: analysesData, isLoading, refetch } = useGetCompetitorAnalyses();
  const [bmcList, setBmcList] = React.useState<BmcData[]>([]);

  React.useEffect(() => {
    refetch();
    const handleFocus = () => refetch();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch]);

  React.useEffect(() => {
    const fetchBmcList = async () => {
      try {
        const response = await bmcApi.getCanvases();
        setBmcList(response.data);
      } catch (error) {
        console.error('BMC 리스트 조회 실패:', error);
      }
    };
    fetchBmcList();
  }, []);

  const handleEmptyCardClick = () => navigate("/competitor/bmc-selection");

  const handleCardClick = (bmcId: number) => {
    if (!analysesData) return;

    const selectedAnalysis = analysesData.data.find(item => item.bmcId === bmcId);
    if (selectedAnalysis) {
      navigate(`/competitor/analysis?bmcId=${bmcId}`, {
        state: {
          analysisData: {
            data: selectedAnalysis,
            status: analysesData.status,
            message: analysesData.message,
            statusCode: analysesData.statusCode,
          },
        },
      });
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const cardData = React.useMemo(() => {
    if (!analysesData?.data) return [];

    const sortedData = [...analysesData.data].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    const uniqueByBmcId = new Map();
    sortedData.forEach(item => {
      if (!uniqueByBmcId.has(item.bmcId)) {
        uniqueByBmcId.set(item.bmcId, item);
      }
    });

    return Array.from(uniqueByBmcId.values()).map(item => {
      const bmcData = bmcList.find(bmc => bmc.id === item.bmcId);

      return {
        bmcId: item.bmcId,
        title: item.userBmc.title,
        date: formatDate(item.createdAt),
        imageUrl: bmcData?.imageUrl || item.userBmc.imageUrl,
      };
    });
  }, [analysesData, bmcList]);

  if (isLoading) {
    return <CompetitorCardSkeleton />;
  }

  return (
    <S.Container>
      <S.MainContent>
        <S.TitleSection>
          <S.Title>경쟁사분석 기능을 사용해보세요!</S.Title>
        </S.TitleSection>

        <S.CardRow>
          <S.BmcImageContainer onClick={handleEmptyCardClick}>
            <S.PlusIconWrapper>
              <Plus />
            </S.PlusIconWrapper>
          </S.BmcImageContainer>

          {cardData.map(card => (
            <BmcCard
              key={card.bmcId}
              id={card.bmcId}
              title={card.title}
              date={card.date}
              imageUrl={card.imageUrl}
              type="competitor"
              onCardClick={() => handleCardClick(card.bmcId)}
              onDelete={handleRefresh}
            />
          ))}
        </S.CardRow>
      </S.MainContent>
    </S.Container>
  );
};

export default CompetitorTemplateCard;
