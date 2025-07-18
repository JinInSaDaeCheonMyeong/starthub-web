// import { useState, useCallback } from 'react';
// import { bmcApi } from '@/entities/bmc/api/bmc';

// export const useBmcStep = () => {
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [answers, setAnswers] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const nextStep = useCallback(() => {
//     if (currentStepIndex < 9) { // 총 10개 질문 (0-9)
//       setCurrentStepIndex(prev => prev + 1);
//     }
//   }, [currentStepIndex]);

//   const prevStep = useCallback(() => {
//     if (currentStepIndex > 0) {
//       setCurrentStepIndex(prev => prev - 1);
//     }
//   }, [currentStepIndex]);

//   const goToStep = useCallback((stepIndex: number) => {
//     if (stepIndex >= 0 && stepIndex <= 9) {
//       setCurrentStepIndex(stepIndex);
//     }
//   }, []);

//   const createSession = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await bmcApi.createSessions();
//       setSessionId(response.data.id);
//       return response.data;
//     } catch (error) {
//       console.error('세션 생성 실패:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const submitAnswer = useCallback(async (answer: string) => {
//     if (!sessionId) return;

//     setIsLoading(true);
//     try {
//       await bmcApi.submitAnswer(sessionId, {
//         questionIndex: currentStepIndex,
//         answer
//       });
      
//       const newAnswers = [...answers];
//       newAnswers[currentStepIndex] = answer;
//       setAnswers(newAnswers);
      
//       nextStep();
//     } catch (error) {
//       console.error('답변 제출 실패:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [sessionId, currentStepIndex, answers, nextStep]);

//   const resetSession = useCallback(() => {
//     setCurrentStepIndex(0);
//     setSessionId(null);
//     setAnswers([]);
//   }, []);

//   return {
//     currentStepIndex,
//     sessionId,
//     answers,
//     isLoading,
//     nextStep,
//     prevStep,
//     goToStep,
//     createSession,
//     submitAnswer,
//     resetSession,
//     isFirstStep: currentStepIndex === 0,
//     isLastStep: currentStepIndex === 9,
//     completedSteps: currentStepIndex,
//     totalSteps: 10
//   };
// };