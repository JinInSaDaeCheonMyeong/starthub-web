import StartHubAxios from '../../../shared/api/customAxios/StartHubAxios';
import { CompetitorAnalysisResponse } from '../model/types';

export const competitorApi = {
  getCompetitorAnalyses: (): Promise<CompetitorAnalysisResponse> =>
    StartHubAxios.get('/analysis/competitors'),

  getCompetitorAnalysisByBmcId: (bmcId: number): Promise<CompetitorAnalysisResponse> =>
    StartHubAxios.get(`/analysis/competitors/bmc/${bmcId}`),

  createCompetitorAnalysis: (bmcId: number): Promise<CompetitorAnalysisResponse> =>
    StartHubAxios.post('/analysis/competitors', { bmcId }),

  regenerateCompetitorAnalysis: (bmcId: number): Promise<CompetitorAnalysisResponse> =>
    StartHubAxios.post(`/analysis/competitors/bmc/${bmcId}/regenerate`),
};
