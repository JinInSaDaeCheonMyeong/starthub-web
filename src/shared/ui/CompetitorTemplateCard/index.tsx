import React from "react";
import * as S from "./style";
import { ReactComponent as Plus } from "@assets/icons/plus.svg";
import { useNavigate } from "react-router-dom";
import { useGetCompetitorAnalyses } from "@/features/competitor/getCompetitorAnalyses/useGetCompetitorAnalyses";
import { CompetitorCardData } from "@/entities/competitor/model/types";
import BmcTemplate from "@assets/images/bmc에시.png";
import { CompetitorCardSkeleton } from "./CompetitorCardSkeleton";

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

  React.useEffect(() => {
    refetch();
    const handleFocus = () => refetch();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch]);

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

  const cardData: CompetitorCardData[] = React.useMemo(() => {
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

    return Array.from(uniqueByBmcId.values()).map(item => ({
      bmcId: item.bmcId,
      title: item.userBmc.title,
      date: formatDate(item.createdAt),
    }));
  }, [analysesData]);

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
            <S.BmcImageContainer key={card.bmcId} onClick={() => handleCardClick(card.bmcId)}>
              <S.ImageWrapper>
                <img src={BmcTemplate} alt={card.title} />
              </S.ImageWrapper>
              <S.BmcTitle>{card.title}</S.BmcTitle>
              <S.BmcDate>{card.date}</S.BmcDate>
            </S.BmcImageContainer>
          ))}
        </S.CardRow>
      </S.MainContent>
    </S.Container>
  );
};

export default CompetitorTemplateCard;
