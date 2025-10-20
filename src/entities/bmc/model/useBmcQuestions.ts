import useQuestionStore from "@/entities/bmc/model/useQuestionStore";

export const useBmcQuestions = () => {
  const { loadQuestions, isLoading } = useQuestionStore();
  
  return { bmcQuestions: loadQuestions, isLoading };
};