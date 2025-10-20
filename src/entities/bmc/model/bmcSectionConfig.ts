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

export interface BmcSectionConfig {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { title?: string | undefined }> | undefined;
  color: string;
  gridArea: string;
  order: number;
}

export const BMC_SECTION_CONFIG: Record<string, BmcSectionConfig> = {
  keyPartners: {
    id: 'keyPartners',
    title: 'Key Partners',
    icon: KeyPartnerships,
    color: '#E3F2FD',
    gridArea: 'key-partners',
    order: 1,
  },
  keyActivities: {
    id: 'keyActivities',
    title: 'Key Activities',
    icon: KeyActivities,
    color: '#F3E5F5',
    gridArea: 'key-activities',
    order: 2,
  },
  valueProposition: {
    id: 'valueProposition',
    title: 'Value Propositions',
    icon: ValueProposition,
    color: '#E8F5E8',
    gridArea: 'value-proposition',
    order: 3,
  },
  customerRelationships: {
    id: 'customerRelationships',
    title: 'Customer Relationships',
    icon: CustomerRelationships,
    color: '#FFF3E0',
    gridArea: 'customer-relationships',
    order: 4,
  },
  customerSegments: {
    id: 'customerSegments',
    title: 'Customer Segments',
    icon: CustomerSegments,
    color: '#FCE4EC',
    gridArea: 'customer-segments',
    order: 5,
  },
  keyResources: {
    id: 'keyResources',
    title: 'Key Resources',
    icon: KeyResources,
    color: '#E1F5FE',
    gridArea: 'key-resources',
    order: 6,
  },
  channels: {
    id: 'channels',
    title: 'Channels',
    icon: Channels,
    color: '#F1F8E9',
    gridArea: 'channels',
    order: 7,
  },
  costStructure: {
    id: 'costStructure',
    title: 'Cost Structure',
    icon: CostStructure,
    color: '#FFEBEE',
    gridArea: 'cost-structure',
    order: 8,
  },
  revenueStreams: {
    id: 'revenueStreams',
    title: 'Revenue Streams',
    icon: RevenueStreams,
    color: '#E8F5E8',
    gridArea: 'revenue-streams',
    order: 9,
  },
};
