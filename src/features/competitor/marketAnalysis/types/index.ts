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
  id?: number;
  title: string;
  valueProposition: string;
  targetCustomer: string;
  keyStrengths: string[];
  keyPartners?: string;
  keyActivities?: string;
  keyResources?: string;
  customerRelationships?: string;
  channels?: string;
  customerSegments?: string;
  costStructure?: string;
  revenueStreams?: string;
}

export interface UserScale {
  estimatedUserBase: string;
  marketPosition: string;
  growthPotential: string;
  competitorComparison?: Competitor[];
  domesticCompetitors?: Competitor[];
  foreignCompetitors?: Competitor[];
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

export interface MarketAnalysisData {
  userBmc: UserBmc;
  userScale: UserScale;
  strengths: Strengths;
  weaknesses: Weaknesses;
  globalExpansionStrategy: GlobalExpansionStrategy;
}

export interface MarketAnalysisResponse {
  data: MarketAnalysisData;
  status: string;
  message: string;
  statusCode: number;
}
