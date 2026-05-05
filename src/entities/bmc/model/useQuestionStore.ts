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
            console.error("Failed to load questions:", error);
            // 로그인이 필요한 경우 기본 질문들을 설정
            const defaultQuestions = [
              { questionNumber: 1, question: "당신의 비즈니스 아이디어를 간단하게 설명해주세요. 어떤 제품이나 서비스를 제공하시나요?" },
              { questionNumber: 2, question: "당신의 제품/서비스를 이용할 주요 고객층은 누구인가요?" },
              { questionNumber: 3, question: "고객에게 제공할 핵심 가치는 무엇이며, 어떤 문제를 해결해주나요?" },
              { questionNumber: 4, question: "고객이 당신의 제품/서비스를 어떤 경로로 만나게 될까요?" },
              { questionNumber: 5, question: "고객과 어떤 관계를 맺고 유지할 계획인가요?" },
              { questionNumber: 6, question: "수익은 어떤 방식으로 창출할 예정인가요?" },
              { questionNumber: 7, question: "비즈니스 운영에 필요한 핵심 자원은 무엇인가요?" },
              { questionNumber: 8, question: "핵심 가치를 제공하기 위해 수행해야 할 주요 활동은 무엇인가요?" },
              { questionNumber: 9, question: "협력해야 할 주요 파트너나 공급업체는 어디인가요?" },
              { questionNumber: 10, question: "비즈니스 운영에 필요한 주요 비용 항목들은 무엇인가요?" }
            ];

            set({
              questions: defaultQuestions,
              isLoaded: true,
              isLoading: false,
              currentQuestionIndex: 0,
            });

            import("@/entities/bmc/model/useBmcStore").then(({ useBmcStore }) => {
              const bmcStore = useBmcStore.getState();
              bmcStore.resetBmc();
            });
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

          } catch (error: any) {
            console.error("답변 전송 실패:", error);

            // 이미 표시된 답변을 롤백
            set((prevState) => {
              const newAnswers = { ...prevState.answers };
              delete newAnswers[questionNumber];
              return { answers: newAnswers };
            });

            // 상세한 에러 메시지 표시
            const errorMessage = error?.response?.data?.message || "답변 전송에 실패했습니다.";
            toast.error(errorMessage);
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