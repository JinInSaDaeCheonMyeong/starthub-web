import { bmcApi } from "@/entities/bmc/api/bmc";
import { stepOrder } from "@/entities/bmc/model/localTypes";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import useSessionStore from "./useSessionStore";
import { toast } from "react-toastify";

interface QuestionState {
  questions: {
    questionNumber: number;
    question: string;
  }[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  isLoading: boolean;
  isLoaded: boolean;
  isGeneratingBmc: boolean;
}

interface QuestionActions {
  setQuestions: (questions: {
    questionNumber: number;
    question: string;
  }[]) => void;
  setIsLoading: (loading: boolean) => void;
  getQuestions: () => {
    questions: { questionNumber: number; question: string }[];
  };
  loadQuestions: () => void;
  getCurrentQuestion: () => { questionNumber: number, question: string } | null;
  moveToNextQuestion: () => void;
  submitAnswer: (questionNumber: number, answer: string) => Promise<void>;
  setAnswer: (questionNumber: number, answer: string) => void;
  setIsGeneratingBmc: (isGenerating: boolean) => void;
  resetStore: () => void;
}

type QuestionStore = QuestionState & QuestionActions;

const useQuestionStore = create<QuestionStore>()(
  devtools(
    persist(
      (set, get) => ({
        questions: [],
        currentQuestionIndex: 0,
        answers: {},
        isLoading: false,
        isLoaded: false,
        isGeneratingBmc: false,

        loadQuestions: async () => {
          const state = get();
          if (state.isLoaded || state.isLoading) {
            return;
          }

          set({ isLoading: true });

          try {
            const response = await bmcApi.getQuestions();
            const questions = response.data;
            const transformedQuestions = questions.map((item, index) => ({
              questionNumber: index + 1,
              question: item.question,
            }));
            set({
              questions: transformedQuestions,
              isLoaded: true,
              isLoading: false,
              currentQuestionIndex: 0,
            });

            import("@/entities/bmc/model/useBmcStore").then(({ useBmcStore }) => {
              const bmcStore = useBmcStore.getState();
              bmcStore.resetBmc();
            });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        setQuestions: (
          questions: { questionNumber: number; question: string }[]
        ) => {
          set(
            {
              questions: questions,
            },
            false,
            "setQuestions"
          );
        },

        getCurrentQuestion: () => {
          const state = get();
          const question = state.questions[state.currentQuestionIndex];
          return question || null;
        },

        setAnswer: (questionNumber: number, answer: string) => {
          set((state) => ({
            answers: {
              ...state.answers,
              [questionNumber]: answer,
            },
          }));
        },

        submitAnswer: async (questionNumber: number, answer: string) => {
          try {
            const sessionStore = useSessionStore.getState();
            const sessionData = sessionStore.getSessionId();

            if (!sessionData?.sessionId) {
              throw new Error("SessionId가 없습니다. 새로운 세션을 생성해주세요.");
            }

            const requestData = {
              questionNumber,
              answer,
              sessionId: Number(sessionData.sessionId),
            };

            set((prevState) => ({
              answers: {
                ...prevState.answers,
                [questionNumber]: answer,
              },
            }));

            await bmcApi.createAnswer(requestData);

          } catch {
            toast.error("답변 전송에 실패했습니다.")
          }
        },

        moveToNextQuestion: () => {
          const state = get();
          const nextIndex = state.currentQuestionIndex + 1;

          if (nextIndex < state.questions.length) {
            set({ currentQuestionIndex: nextIndex });

            import("@/entities/bmc/model/useBmcStore").then(({ useBmcStore }) => {
              const bmcStore = useBmcStore.getState();
              const currentStep = stepOrder[nextIndex];
              if (currentStep) {
                bmcStore.setCurrentStep(currentStep);
                if (nextIndex > 0) {
                  const prevStep = stepOrder[nextIndex - 1];
                  bmcStore.markStepCompleted(prevStep);
                }
              }
            });
          }
        },

        setIsLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },

        getQuestions: () => {
          const state = get();
          return {
            questions: state.questions!,
          };
        },

        setIsGeneratingBmc: (isGenerating: boolean) => {
          set({ isGeneratingBmc: isGenerating }, false, "setIsGeneratingBmc");
        },

        resetStore: () => {
          set({
            questions: [],
            currentQuestionIndex: 0,
            answers: {},
            isLoading: false,
            isLoaded: false,
            isGeneratingBmc: false,
          }, false, "resetStore");
        },
      }),
      {
        name: "question-store",
      }
    ),
    { name: "question-store" }
  )
);

export default useQuestionStore;