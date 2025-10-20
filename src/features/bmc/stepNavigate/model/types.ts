import { LocalBmcStep } from "@/entities/bmc/model/localTypes";

export interface StepItem {
  id: LocalBmcStep;
  icon: React.ComponentType;
  label: string;
  subLabel?: string;
  description?: string;
}

export interface StepStateProps {
  $isCompleted?: boolean;
  $isCurrent?: boolean;
}
