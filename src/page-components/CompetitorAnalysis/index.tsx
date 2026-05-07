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
  const { data: analysesData, isLoading, isError, refetch } = useGetCompetitorAnalyses();

  // bmcId가 변경될 때마다 리페치
  useEffect(() => {
    if (bmcId) {
      refetch();
    }
  }, [bmcId, refetch]);

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

  // 데이터가 없는 경우
  if (!analysesData?.data || analysesData.data.length === 0) {
    return (
      <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
        <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
          <div className="min-h-[60vh] flex justify-center items-center">
            <div className="text-center">
              <p className="font-pt-body2-medium text-hub-gray-2 mb-4">분석 데이터가 없습니다.</p>
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

  // bmcId에 해당하는 분석 데이터 찾기
  const selectedAnalysis = bmcId && analysesData.data
    ? analysesData.data.find(analysis => analysis.bmcId === Number(bmcId))
    : analysesData.data[0];

  // 디버깅: bmcId로 찾을 수 없을 때 사용 가능한 BMC ID 목록 표시
  if (bmcId && !selectedAnalysis) {
    console.log(`BMC ID ${bmcId}에 대한 분석을 찾을 수 없습니다.`);
    console.log('사용 가능한 BMC ID:', analysesData.data.map(a => a.bmcId));
  }

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
      data={{
        data: selectedAnalysis,
        status: analysesData.status,
        message: analysesData.message,
        statusCode: analysesData.statusCode
      }}
      bmcId={bmcId ? Number(bmcId) : selectedAnalysis.userBmc?.id}
    />
  );
};

export default CompetitorAnalysis;
