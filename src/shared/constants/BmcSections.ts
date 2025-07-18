export interface BmcSectionInfo {
  stepNumber: number
  id: string;
  title: string;
  step: string;
  description: string;
  icon: string;
}

export const BMC_SECTIONS: BmcSectionInfo[] = [
  {
    stepNumber: 1,
    id: 'customerSegments',
    title: 'Customer Segments',
    step: '고객 이해하기',
    description: '문제를 겪는 주요 고객층의 특성과 상황을 파악합니다.',
    icon: 'user' as const
  },
  {
    stepNumber: 2,
    id: 'valueProposition',
    title: 'Value Proposition',
    step: '핵심 가치 찾기',
    description: '제품이나 서비스가 고객에게 제공할 핵심 가치를 도출합니다.',
    icon: 'diamond' as const
  },
  {
    stepNumber: 3,
    id: 'channels',
    title: 'Channels',
    step: '전달 경로 설정하기',
    description: '고객에게 가치를 전달할 주요 채널과 경로를 정합니다.',
    icon: 'truck' as const
  },
  {
    stepNumber: 4,
    id: 'customerRelationships',
    title: 'Customer Relationships',
    step: '관계 방식 고민하기',
    description: '고객과의 관계를 형성하고 유지하는 전략을 수립합니다.',
    icon: 'hand' as const
  },
  {
    stepNumber: 5,
    id: 'keyResources',
    title: 'Key Resources',
    step: '자원 파악하기',
    description: '사업 운영에 필요한 핵심 자원들을 식별합니다.',
    icon: 'database' as const
  },
  {
    stepNumber: 6,
    id: 'keyActivities',
    title: 'Key Activities',
    step: '활동 정의하기',
    description: '사업 성공을 위해 반드시 수행해야 할 핵심 활동을 도출합니다.',
    icon: 'chat' as const
  },
  {
    stepNumber: 7,
    id: 'keyPartnerships',
    title: 'Key Partnerships',
    step: '협력 구조 생각하기',
    description: '필요한 외부 파트너 및 협력 관계를 설정합니다.',
    icon: 'link' as const
  },
  {
    stepNumber: 8,
    id: 'costStructure',
    title: 'Cost Structure',
    step: '비용 구조 살펴보기',
    description: '사업 운영에 들어가는 주요 비용 구조를 정리합니다.',
    icon: 'card' as const
  },
  {
    stepNumber: 9,
    id: 'revenueStreams',
    title: 'Revenue Streams',
    step: '수익 모델 그리기',
    description: '수익을 창출할 구체적인 방법과 모델을 설계합니다.',
    icon: 'dollar' as const
  },
  {
    stepNumber: 10,
    id: 'customerJourneyFlow',
    title: 'Customer Journey Flow',
    step: '고객 경험 흐름',
    description: '고객이 문제를 인식하고 → 우리 서비스를 만나고 → 재방문하기까지 전체 흐름을 설계합니다.',
    icon: 'map' as const
  }
] as const;