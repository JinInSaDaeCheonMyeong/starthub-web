import { ComponentType, SVGProps } from 'react';
import {
  Channels,
  CostStructure,
  CustomerRelationships,
  CustomerSegments,
  KeyActivities,
  KeyPartnerships,
  KeyResources,
  RevenueStreams,
  ValueProposition,
} from '@/assets/icons/bmc';
import { BmcTemplateType } from './types';
import { StartHubColors } from '@/shared/design';

export interface BmcSectionConfig {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { title?: string | undefined }> | undefined;
  color: string;
  gridArea: string;
  order: number;
}

const COLOR_TEMPLATE_COLORS: Record<string, string> = {
  keyPartners: "#709DFF",
  keyActivities: "#D176FF",
  valueProposition: "#37B6FF",
  customerRelationships: "#92E4A8",
  customerSegments: "#FF7FB8",
  keyResources: "#FF7F7F",
  channels: "#FFBE62",
  costStructure: "#D8D378",
  revenueStreams: "#14D2C8",
};

const STARTHUB_COLORS: Record<string, string> = {
  keyPartners: `${StartHubColors.Primary}`,
  keyActivities: `${StartHubColors.Primary}`,
  valueProposition: `${StartHubColors.Primary}`,
  customerRelationships: `${StartHubColors.Primary}`,
  customerSegments: `${StartHubColors.Primary}`,
  keyResources: `${StartHubColors.Primary}`,
  channels: `${StartHubColors.Primary}`,
  costStructure: `${StartHubColors.Primary}`,
  revenueStreams: `${StartHubColors.Primary}`,
};

const STARTHUB_DARK_COLORS: Record<string, string> = {
  keyPartners: `${StartHubColors.Gray1}`,
  keyActivities: `${StartHubColors.Gray1}`,
  valueProposition: `${StartHubColors.Gray1}`,
  customerRelationships: `${StartHubColors.Gray1}`,
  customerSegments: `${StartHubColors.Gray1}`,
  keyResources: `${StartHubColors.Gray1}`,
  channels: `${StartHubColors.Gray1}`,
  costStructure: `${StartHubColors.Gray1}`,
  revenueStreams: `${StartHubColors.Gray1}`,
};

const SIMPLE_COLORS: Record<string, string> = {
  keyPartners: `${StartHubColors.Black1}`,
  keyActivities: `${StartHubColors.Black1}`,
  valueProposition: `${StartHubColors.Black1}`,
  customerRelationships: `${StartHubColors.Black1}`,
  customerSegments: `${StartHubColors.Black1}`,
  keyResources: `${StartHubColors.Black1}`,
  channels: `${StartHubColors.Black1}`,
  costStructure: `${StartHubColors.Black1}`,
  revenueStreams: `${StartHubColors.Black1}`,
};

const TEMPLATE_COLOR_MAP: Record<BmcTemplateType, Record<string, string>> = {
  'COLOR': COLOR_TEMPLATE_COLORS,
  'STARTHUB': STARTHUB_COLORS,
  'STARTHUB_DARK': STARTHUB_DARK_COLORS,
  'SIMPLE': SIMPLE_COLORS,
};

const BASE_SECTION_CONFIG = {
  keyPartners: {
    id: 'keyPartners',
    title: 'Key Partners',
    icon: KeyPartnerships,
    gridArea: 'key-partners',
    order: 1,
  },
  keyActivities: {
    id: 'keyActivities',
    title: 'Key Activities',
    icon: KeyActivities,
    gridArea: 'key-activities',
    order: 2,
  },
  valueProposition: {
    id: 'valueProposition',
    title: 'Value Propositions',
    icon: ValueProposition,
    gridArea: 'value-proposition',
    order: 3,
  },
  customerRelationships: {
    id: 'customerRelationships',
    title: 'Customer Relationships',
    icon: CustomerRelationships,
    gridArea: 'customer-relationships',
    order: 4,
  },
  customerSegments: {
    id: 'customerSegments',
    title: 'Customer Segments',
    icon: CustomerSegments,
    gridArea: 'customer-segments',
    order: 5,
  },
  keyResources: {
    id: 'keyResources',
    title: 'Key Resources',
    icon: KeyResources,
    gridArea: 'key-resources',
    order: 6,
  },
  channels: {
    id: 'channels',
    title: 'Channels',
    icon: Channels,
    gridArea: 'channels',
    order: 7,
  },
  costStructure: {
    id: 'costStructure',
    title: 'Cost Structure',
    icon: CostStructure,
    gridArea: 'cost-structure',
    order: 8,
  },
  revenueStreams: {
    id: 'revenueStreams',
    title: 'Revenue Streams',
    icon: RevenueStreams,
    gridArea: 'revenue-streams',
    order: 9,
  },
};

export const getBmcSectionConfig = (
  templateType: BmcTemplateType = 'COLOR'
): Record<string, BmcSectionConfig> => {
  const colors = TEMPLATE_COLOR_MAP[templateType];

  return Object.entries(BASE_SECTION_CONFIG).reduce((acc, [key, config]) => {
    acc[key] = {
      ...config,
      color: colors[key],
    };
    return acc;
  }, {} as Record<string, BmcSectionConfig>);
};

export const BMC_SECTION_CONFIG = getBmcSectionConfig('COLOR');
