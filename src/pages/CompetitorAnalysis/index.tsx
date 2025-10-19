import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MarketAnalysis from "@/features/competitor/marketAnalysis/ui/MarketAnalysis";
import { MarketAnalysisSkeleton } from "@/features/competitor/marketAnalysis/ui/MarketAnalysisSkeleton";
import Layout from "@/shared/ui/Layout";
import { MarketAnalysisResponse } from "@/features/competitor/marketAnalysis/types";

const CompetitorAnalysis = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const passedData = location.state?.analysisData;
  const bmcId = searchParams.get("bmcId");

  const [data, setData] = useState<MarketAnalysisResponse | null>(passedData || null);
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
      <Layout>
        <MarketAnalysisSkeleton />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {data && <MarketAnalysis data={data} bmcId={bmcId ? Number(bmcId) : undefined} />}
    </Layout>
  );
};

export default CompetitorAnalysis;
