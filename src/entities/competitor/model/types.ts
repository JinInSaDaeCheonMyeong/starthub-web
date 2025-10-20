export interface Competitor {
  name: string;
  logoUrl: string;
  websiteUrl: string;
  estimatedScale: string;
  marketShare: string;
  similarities: string[];
  differences: string[];
}

export interface UserBmc {
  title: string;
  valueProposition: string;
  targetCustomer: string;
  keyStrengths: string[];
}

export interface UserScale {
  estimatedUserBase: string;
  marketPosition: string;
  growthPotential: string;
  competitorComparison: Competitor[];
}

export interface Strengths {
  competitiveAdvantages: string[];
  uniqueValuePropositions: string[];
  marketOpportunities: string[];
  strategicRecommendations: string[];
}

export interface Weaknesses {
  competitiveDisadvantages: string[];
  marketChallenges: string[];
  resourceLimitations: string[];
  improvementAreas: string[];
}

export interface GlobalExpansionStrategy {
  priorityMarkets: string[];
  entryStrategies: string[];
  localizationRequirements: string[];
  partnershipOpportunities: string[];
  expectedChallenges: string[];
}

export interface CompetitorAnalysisItem {
  bmcId: number;
  userBmc: UserBmc;
  userScale: UserScale;
  strengths: Strengths;
  weaknesses: Weaknesses;
  globalExpansionStrategy: GlobalExpansionStrategy;
  createdAt?: string;
}

export interface CompetitorAnalysisResponse {
  data: CompetitorAnalysisItem[];
  status: string;
  message: string;
  statusCode: number;
}

export interface CompetitorCardData {
  bmcId: number;
  title: string;
  date: string;
}
