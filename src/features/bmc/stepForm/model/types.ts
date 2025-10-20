import { LocalBmcStep } from "@/entities/bmc/model/localTypes";

export interface StepFormProps {
  stepId: LocalBmcStep;
  title: string;
  description: string;
  placeholder: string;
}

export interface StepFormState {
  answer: string;
  isSubmitting: boolean;
}
