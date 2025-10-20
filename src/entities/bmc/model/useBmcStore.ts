import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  LocalBmcStep, 
  LocalStepData, 
  LocalBmcStore, 
  stepOrder
} from './localTypes';

export const useBmcStore = create<LocalBmcStore>()(
  devtools(
    (set, get) => ({
      currentStep: "business-idea",
      completedSteps: new Set<LocalBmcStep>(),
      stepData: {} as Record<LocalBmcStep, LocalStepData>,

      setCurrentStep: (step: LocalBmcStep) => {
        set(
          () => ({
            currentStep: step,
          }),
          false,
          "setCurrentStep"
        );
      },

      markStepCompleted: (step: LocalBmcStep) => {
        set(
          (state) => ({
            completedSteps: new Set([...state.completedSteps, step]),
          }),
          false,
          "markStepCompleted"
        );
      },

      markStepIncomplete: (step: LocalBmcStep) => {
        set(
          (state) => {
            const newCompletedSteps = new Set(state.completedSteps);
            newCompletedSteps.delete(step);
            return { completedSteps: newCompletedSteps };
          },
          false,
          "markStepIncomplete"
        );
      },

      isStepCompleted: (step: LocalBmcStep) => {
        return get().completedSteps.has(step);
      },

      isStepCurrent: (step: LocalBmcStep) => {
        return get().currentStep === step;
      },

      nextStep: () => {
        const currentIndex = stepOrder.indexOf(get().currentStep);
        if (currentIndex < stepOrder.length - 1) {
          set({ currentStep: stepOrder[currentIndex + 1] }, false, "nextStep");
        }
      },

      prevStep: () => {
        const currentIndex = stepOrder.indexOf(get().currentStep);
        if (currentIndex > 0) {
          set({ currentStep: stepOrder[currentIndex - 1] }, false, "prevStep");
        }
      },

      setStepData: (step: LocalBmcStep, data: LocalStepData) => {
        set(
          (state) => ({
            stepData: {
              ...state.stepData,
              [step]: data,
            },
          }),
          false,
          "setStepData"
        );
      },

      getStepData: (step: LocalBmcStep) => {
        return get().stepData[step];
      },

      resetBmc: () => {
        set(
          {
            currentStep: "business-idea",
            completedSteps: new Set<LocalBmcStep>(),
            stepData: {} as Record<LocalBmcStep, LocalStepData>,
          },
          false,
          "resetBmc"
        );
      },
    }),
    {
      name: "bmc-store",
    }
  )
);
