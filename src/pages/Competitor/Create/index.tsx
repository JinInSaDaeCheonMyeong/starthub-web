import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import MarketAnalysis from "@/features/competitor/marketAnalysis/ui/MarketAnalysis/index";
import { MarketAnalysisSkeleton } from "@/features/competitor/marketAnalysis/ui/MarketAnalysisSkeleton";
import Layout from "@/shared/ui/Layout";
import LoadingModal from "@/shared/ui/LoadingModal";
import { competitorApi } from "@/entities/competitor/api/competitor";
import { MarketAnalysisResponse } from "@/features/competitor/marketAnalysis/types";
import { COMPETITOR_QUERY_KEYS } from "@/entities/competitor/queryKey";

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  code?: string;
}

const getErrorMessage = (error: unknown): string => {
  const apiError = error as ApiError;
  const status = apiError.response?.status;
  const message = apiError.response?.data?.message;

  if (apiError.code === "ECONNABORTED") {
    return "경쟁사 분석 중입니다. 시간이 오래 걸릴 수 있습니다. 잠시 후 다시 시도해주세요.";
  }
  if (status === 500)
    return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  if (status === 404) return "BMC를 찾을 수 없습니다.";
  if (message) return `${message} (${status || ""})`;
  return `데이터를 불러오는데 실패했습니다. (${status || "네트워크 오류"})`;
};

const CompetitorCreate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const bmcId = searchParams.get("bmcId");

  const [serverData, setServerData] = useState<MarketAnalysisResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bmcId) {
      setError("BMC ID가 필요합니다.");
      setLoading(false);
      return;
    }

    const createAnalysis = async () => {
      try {
        setLoading(true);

        const existingAnalyses = await competitorApi.getCompetitorAnalyses();
        const hasExisting = existingAnalyses.data.some(
          (item) => item.bmcId === Number(bmcId)
        );

        const data = hasExisting
          ? await competitorApi.regenerateCompetitorAnalysis(Number(bmcId))
          : await competitorApi.createCompetitorAnalysis(Number(bmcId));

        setServerData(data);

        await queryClient.resetQueries({
          queryKey: COMPETITOR_QUERY_KEYS.competitor.getAnalyses,
          exact: true,
        });
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    createAnalysis();
  }, [bmcId, queryClient]);

  if (loading) {
    return (
      <Layout>
        <LoadingModal
          isOpen={loading}
          message={"경쟁사 분석을 진행 중입니다.\n약 1분 정도 소요됩니다."}
        />
        <MarketAnalysisSkeleton />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p>{error}</p>
        <button onClick={() => navigate("/competitor")}>
          목록으로 돌아가기
        </button>
      </Layout>
    );
  }

  return (
    <Layout>
      {serverData && (
        <MarketAnalysis
          data={serverData}
          bmcId={bmcId ? Number(bmcId) : undefined}
        />
      )}
    </Layout>
  );
};

export default CompetitorCreate;
