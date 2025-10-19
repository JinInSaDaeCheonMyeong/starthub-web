import { BmcIconType } from "./icons";

export type BmcFieldKey =
  | "customerSegments"
  | "valueProposition"
  | "channels"
  | "customerRelationships"
  | "keyResources"
  | "keyActivities"
  | "keyPartners"
  | "costStructure"
  | "revenueStreams";

interface BmcItemConfig {
  title: string;
  subtitle: string;
  field: BmcFieldKey;
  iconType: BmcIconType;
}

export const BMC_ITEMS: readonly BmcItemConfig[] = [
  {
    title: "고객",
    subtitle: "Customer Segments",
    field: "customerSegments",
    iconType: "user",
  },
  {
    title: "가치 제안",
    subtitle: "Value Proposition",
    field: "valueProposition",
    iconType: "diamond",
  },
  {
    title: "채널",
    subtitle: "Channels",
    field: "channels",
    iconType: "truck",
  },
  {
    title: "고객 관계",
    subtitle: "Customers Relationships",
    field: "customerRelationships",
    iconType: "heart",
  },
  {
    title: "핵심 자원",
    subtitle: "Key Resources",
    field: "keyResources",
    iconType: "database",
  },
  {
    title: "핵심 활동",
    subtitle: "Key Activities",
    field: "keyActivities",
    iconType: "chat",
  },
  {
    title: "핵심 파트너",
    subtitle: "Key Partnerships",
    field: "keyPartners",
    iconType: "link",
  },
  {
    title: "비용",
    subtitle: "Cost Structure",
    field: "costStructure",
    iconType: "creditCard",
  },
  {
    title: "수익",
    subtitle: "Revenue Streams",
    field: "revenueStreams",
    iconType: "dollar",
  },
];
