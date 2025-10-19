import StartHubAxios from '../../../shared/api/customAxios/StartHubAxios';
import SubApiAxios from '../../../shared/api/customAxios/SubApiAxios';
import { CompetitorAnalysisResponse } from '../model/types';

export const competitorApi = {
  getCompetitorAnalyses: (): Promise<CompetitorAnalysisResponse> =>
    StartHubAxios.get('/analysis/competitors'),

  getCompetitorAnalysisByBmcId: (bmcId: number): Promise<any> =>
    StartHubAxios.get(`/analysis/competitors/bmc/${bmcId}`),

  createCompetitorAnalysis: (bmcId: number): Promise<any> =>
    SubApiAxios.post('/analysis/competitors', { bmcId }),

  regenerateCompetitorAnalysis: (bmcId: number): Promise<any> =>
    SubApiAxios.post(`/analysis/competitors/bmc/${bmcId}/regenerate`),
};
