import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { competitorApi } from '@/entities/competitor/api/competitor';
import { AxiosError } from 'axios';
import { CompetitorAnalysisResponse } from '@/entities/competitor/model/types';
import { COMPETITOR_QUERY_KEYS } from '@/entities/competitor/queryKey';
import { useAuthStore } from '@/app/model/stores/useAuthStore';

export const useGetCompetitorAnalyses = (
  options?: UseQueryOptions<CompetitorAnalysisResponse, AxiosError, CompetitorAnalysisResponse>
) => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return useQuery({
    queryKey: COMPETITOR_QUERY_KEYS.competitor.getAnalyses,
    queryFn: () => competitorApi.getCompetitorAnalyses(),
    staleTime: 0, // 항상 최신 데이터 가져오기
    gcTime: 1000 * 60 * 10,
    enabled: isLoggedIn,
    retry: false,
    ...options,
  });
};
