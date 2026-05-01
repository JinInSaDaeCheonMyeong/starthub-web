"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MarketAnalysis from "@/features/competitor/marketAnalysis/ui/MarketAnalysis/index";
import { MarketAnalysisSkeleton } from "@/features/competitor/marketAnalysis/ui/MarketAnalysisSkeleton";
import { MarketAnalysisResponse } from "@/features/competitor/marketAnalysis/types";

const CompetitorAnalysis = () => {
  const searchParams = useSearchParams();
  const bmcId = searchParams.get("bmcId");

  // Next.js에서는 location.state가 없으므로 다른 방법으로 데이터 전달 필요
  // 예: query parameter나 context, 또는 서버에서 데이터 fetch
  const passedData = null; // 임시로 null 설정

  const [data, setData] = useState<MarketAnalysisResponse | null>(
    passedData || null
  );
  const [loading, setLoading] = useState(!passedData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (passedData) {
      setData(passedData);
      setLoading(false);
      return;
    }

    setError("경쟁사 분석 목록에서 선택해주세요.");
    setLoading(false);
  }, [passedData]);

  if (loading) {
    return (
      <>
        <MarketAnalysisSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      {data && (
        <MarketAnalysis data={data} bmcId={bmcId ? Number(bmcId) : undefined} />
      )}
    </>
  );
};

export default CompetitorAnalysis;
