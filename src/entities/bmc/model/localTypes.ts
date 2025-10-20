export type LocalBmcStep =
  | "business-idea"
  | "customer-segments"
  | "value-proposition"
  | "channels"
  | "customer-relationships"
  | "revenue-streams"
  | "key-resources"
  | "key-activities"
  | "key-partnerships"
  | "cost-structure";

export interface LocalStepData {
  answers?: string[];
  isCompleted?: boolean;
}

export interface LocalBmcState {
  currentStep: LocalBmcStep;
  completedSteps: Set<LocalBmcStep>;
  stepData: Record<LocalBmcStep, LocalStepData>;
}

export interface LocalBmcActions {
  setCurrentStep: (step: LocalBmcStep) => void;
  markStepCompleted: (step: LocalBmcStep) => void;
  markStepIncomplete: (step: LocalBmcStep) => void;
  isStepCompleted: (step: LocalBmcStep) => boolean;
  isStepCurrent: (step: LocalBmcStep) => boolean;
  nextStep: () => void;
  prevStep: () => void;
  setStepData: (step: LocalBmcStep, data: LocalStepData) => void;
  getStepData: (step: LocalBmcStep) => LocalStepData | undefined;
  resetBmc: () => void;
}

export type LocalBmcStore = LocalBmcState & LocalBmcActions;

export const stepOrder: LocalBmcStep[] = [
  'business-idea',
  'customer-segments',
  'value-proposition',
  'channels',
  'customer-relationships',
  'revenue-streams',
  'key-resources',
  'key-activities',
  'key-partnerships',
  'cost-structure',
];