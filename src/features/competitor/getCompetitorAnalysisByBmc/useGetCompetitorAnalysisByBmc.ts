import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { competitorApi } from '@/entities/competitor/api/competitor';
import { AxiosError } from 'axios';
import { CompetitorAnalysisResponse } from '@/entities/competitor/model/types';
import { useAuthStore } from '@/app/model/stores/useAuthStore';

export const useGetCompetitorAnalysisByBmc = (
  bmcId: number | null,
  options?: UseQueryOptions<CompetitorAnalysisResponse, AxiosError, CompetitorAnalysisResponse>
) => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return useQuery({
    queryKey: ['competitor', 'analysis', 'bmc', bmcId],
    queryFn: () => competitorApi.getCompetitorAnalysisByBmcId(bmcId!),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: isLoggedIn && !!bmcId,
    retry: false,
    ...options,
  });
};