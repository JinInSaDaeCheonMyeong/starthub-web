"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MarketAnalysis from "@/features/competitor/marketAnalysis/ui/MarketAnalysis/index";
import { MarketAnalysisSkeleton } from "@/features/competitor/marketAnalysis/ui/MarketAnalysisSkeleton";
import { useGetCompetitorAnalyses } from "@/features/competitor/getCompetitorAnalyses/useGetCompetitorAnalyses";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

const CompetitorAnalysis = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bmcId = searchParams?.get("bmcId");
  const analysisId = searchParams?.get("analysisId");

  const { isLoggedIn } = useAuthStore();
  const { data: analysesData, isLoading, isError } = useGetCompetitorAnalyses();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("로그인 후 이용하실 수 있습니다.", { toastId: "login-required-competitor-analysis" });
      router.push("/sign-in");
    }
  }, [isLoggedIn, router]);

  // 로그인하지 않은 경우
  if (!isLoggedIn) {
    return (
      <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
        <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
          <div className="min-h-[60vh] flex justify-center items-center">
            <div className="text-center">
              <p className="font-pt-body2-medium text-hub-gray-2">로그인 페이지로 이동 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 로딩 중
  if (isLoading) {
    return <MarketAnalysisSkeleton />;
  }

  // 에러 발생
  if (isError || !analysesData) {
    return (
      <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
        <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
          <div className="min-h-[60vh] flex justify-center items-center">
            <div className="text-center">
              <p className="font-pt-body2-medium text-hub-error mb-4">분석 데이터를 불러오는 중 오류가 발생했습니다.</p>
              <button
                onClick={() => router.push("/competitor")}
                className="font-pt-body2-medium text-hub-primary hover:underline"
              >
                경쟁사 분석 페이지로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // analysisId가 있으면 해당 분석 데이터를 찾아서 표시
  const selectedAnalysis = analysisId
    ? analysesData.data.find(analysis => analysis.analysisId === Number(analysisId))
    : analysesData.data[0]; // 없으면 첫 번째 분석 데이터

  if (!selectedAnalysis) {
    return (
      <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
        <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
          <div className="min-h-[60vh] flex justify-center items-center">
            <div className="text-center">
              <p className="font-pt-body2-medium text-hub-gray-2 mb-4">분석 데이터를 찾을 수 없습니다.</p>
              <button
                onClick={() => router.push("/competitor")}
                className="font-pt-body2-medium text-hub-primary hover:underline"
              >
                경쟁사 분석 페이지로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MarketAnalysis
      data={{ data: selectedAnalysis }}
      bmcId={bmcId ? Number(bmcId) : selectedAnalysis.userBmc?.id}
    />
  );
};

export default CompetitorAnalysis;
