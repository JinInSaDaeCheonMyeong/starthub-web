"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StepFormProps } from "../model/types";
import useQuestionStore from "@/entities/bmc/model/useQuestionStore";
import useSessionStore from "@/entities/bmc/model/useSessionStore";
import { bmcApi } from "@/entities/bmc/api/bmc";
import { toast } from "react-toastify";
import Message from "./Message";
import BmcGeneratingSkeleton from "./BmcGeneratingSkeleton";

const BmcStepForm = ({ stepId, placeholder }: StepFormProps) => {
  const [currentInput, setCurrentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const {
    getCurrentQuestion,
    submitAnswer,
    moveToNextQuestion,
    currentQuestionIndex,
    questions,
    answers,
    isGeneratingBmc,
    setIsGeneratingBmc,
  } = useQuestionStore();

  const { getSessionId } = useSessionStore();
  const router = useRouter();

  const currentQuestion = getCurrentQuestion();
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;

  useEffect(() => {
    requestAnimationFrame(() => {
      textAreaRef.current?.focus();
    });
  }, [stepId]);

  useEffect(() => {
    if (currentQuestion) setCurrentInput("");
  }, [currentQuestion]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [answers, currentQuestionIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    const value = el.value;

    if (value.length > 1000) {
      toast.error("최대 1000자까지 입력 가능합니다.");
      return;
    }

    setCurrentInput(value);

    if (isSubmitting) return;

    el.style.height = "auto";

    const style = window.getComputedStyle(el);
    const padding =
      parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const lineHeight = parseFloat(style.lineHeight);
    const maxHeight = lineHeight * 4 + padding;

    const newHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${newHeight}px`;

    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSubmitting && currentInput.trim()) handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const trimmed = currentInput.trim();

    if (trimmed.length < 5) {
      toast.error("최소 5자 이상 입력해주세요.");
      return;
    }

    if (trimmed.length > 1000) {
      toast.error("최대 1000자까지 입력 가능합니다.");
      return;
    }

    if (!currentQuestion) return;

    const sessionData = getSessionId();

    if (!sessionData) {
      toast.error("세션이 없습니다.");
      router.push("/bmc");
      return;
    }

    setIsSubmitting(true);
    setCurrentInput("");
    if (textAreaRef.current) textAreaRef.current.style.height = "auto";

    try {
      await submitAnswer(currentQuestion.questionNumber, trimmed);

      setTimeout(scrollToBottom, 100);

      if (isLastQuestion) {
        try {
          setIsGeneratingBmc(true);

          const res = await bmcApi.generateBmc({
            sessionId: sessionData.sessionId,
          });

          toast.success("BMC 생성 완료");
          router.push(`/bmc/${res.data.id}`);
        } catch (error: any) {
          console.error("BMC 생성 실패:", error);
          const errorMessage = error?.response?.data?.message || "BMC 생성에 실패했습니다.";
          toast.error(errorMessage);
          setIsGeneratingBmc(false);
        }
      } else {
        moveToNextQuestion();
        setTimeout(scrollToBottom, 200);
      }
    } catch (error: any) {
      // submitAnswer에서 이미 에러 토스트를 보여주므로 여기서는 로그만 기록
      console.error("답변 제출 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isGeneratingBmc) return <BmcGeneratingSkeleton />;

  // 프로그레스 계산
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  if (!currentQuestion) {
    return (
      <div className="flex flex-col w-full h-full">
        {/* 모바일 프로그레스바 - 고정 위치 (로딩 상태) */}
        <div className="block lg:hidden fixed top-[90px] sm:top-[100px] left-0 right-0 bg-hub-white-2 z-10 px-4 py-3 border-b border-hub-gray-4 h-[60px] sm:h-[65px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-pt-caption1-medium text-hub-gray-2">진행률</span>
            <span className="text-sm font-pt-caption1-medium text-hub-primary">0%</span>
          </div>
          <div className="w-full bg-hub-gray-4 rounded-full h-2">
            <div className="bg-hub-primary h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
          </div>
        </div>

        {/* 모바일에서 프로그레스바 아래 남은 공간을 모두 채우는 컨테이너 (로딩 상태) */}
        <div className="lg:hidden flex justify-center items-start p-4 mt-[150px] sm:mt-[165px]">
          <div className="w-full max-w-[680px] h-[500px] sm:h-[600px] bg-hub-white-1 border-2 border-hub-gray-3 rounded-lg flex flex-col p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:gap-4 overflow-y-auto mb-4 sm:mb-5 font-pt-caption1-regular flex-1 min-h-0">
              <Message isMine={false} message="질문을 불러오는 중입니다..." />
            </div>
            <div className="p-3 sm:p-4 bg-hub-gray-4 border-2 border-hub-gray-3 rounded-xl w-full flex items-center justify-center flex-shrink-0">
              <span className="text-hub-gray-2 font-pt-caption1-regular text-sm">로딩 중...</span>
            </div>
          </div>
        </div>

        {/* 데스크톱 레이아웃 (로딩 상태) */}
        <div className="hidden lg:flex w-[680px] lg:h-[650px] bg-hub-white-1 border-2 border-hub-gray-3 rounded-lg flex-col p-4 sm:p-6 lg:p-[30px_20px]">
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 overflow-y-auto mb-4 sm:mb-5 font-pt-caption1-regular flex-1 min-h-0">
            <Message isMine={false} message="질문을 불러오는 중입니다..." />
          </div>
          <div className="p-3 sm:p-4 lg:p-[14px_20px] bg-hub-gray-4 border-2 border-hub-gray-3 rounded-xl w-full flex items-center justify-center flex-shrink-0">
            <span className="text-hub-gray-2 font-pt-caption1-regular text-sm">로딩 중...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* 모바일 프로그레스바 - 고정 위치 */}
      <div className="block lg:hidden fixed top-[90px] sm:top-[100px] left-0 right-0 bg-hub-white-2 z-10 px-4 py-3 border-b border-hub-gray-4 h-[60px] sm:h-[65px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-pt-caption1-medium text-hub-gray-2">
            질문 {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span className="text-sm font-pt-caption1-medium text-hub-primary">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-hub-gray-4 rounded-full h-2">
          <div
            className="bg-hub-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 모바일에서 프로그레스바 아래 남은 공간을 모두 채우는 컨테이너 */}
      <div className="lg:hidden flex justify-center items-start p-4 mt-[150px] sm:mt-[165px]">
        <div className="w-full max-w-[680px] h-[500px] sm:h-[600px] bg-hub-white-1 border-2 border-hub-gray-3 rounded-lg flex flex-col p-4 sm:p-6">
          <div
            ref={messagesContainerRef}
            className="flex flex-col gap-3 sm:gap-4 overflow-y-auto mb-4 sm:mb-5 font-pt-caption1-regular flex-1 min-h-0"
          >
            {questions.slice(0, currentQuestionIndex + 1).map((q, i) => {
              const answer = answers[q.questionNumber];
              const isCurrent = i === currentQuestionIndex;

              return (
                <div key={q.questionNumber}>
                  <Message
                    isMine={false}
                    message={q.question}
                    enableTyping={isCurrent && !answer}
                    questionNumber={q.questionNumber}
                  />
                  {answer && <Message isMine message={answer} />}
                </div>
              );
            })}
          </div>

          <div className="p-3 sm:p-4 bg-hub-white-1 border-2 border-hub-gray-3 rounded-xl w-full flex items-center gap-3 flex-shrink-0">
            <textarea
              ref={textAreaRef}
              rows={1}
              value={currentInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isSubmitting}
              className="flex-1 min-h-[1.5em] leading-[1.5] resize-none border-none outline-none overflow-hidden m-0 p-0 block font-pt-caption1-regular placeholder:text-hub-gray-2 text-sm sm:text-base bg-transparent"
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !currentInput.trim()}
              className="px-3 sm:px-4 py-2 rounded-lg font-pt-caption1-medium text-xs sm:text-sm transition-colors flex-shrink-0 min-w-[60px] sm:min-w-[70px]"
              style={{
                backgroundColor: isSubmitting || !currentInput.trim() ? '#D9D9D9' : '#007AFF',
                color: isSubmitting || !currentInput.trim() ? '#999999' : '#FFFFFF'
              }}
            >
              {isSubmitting ? '전송중' : '전송'}
            </button>
          </div>
        </div>
      </div>

      {/* 데스크톱 레이아웃 */}
      <div className="hidden lg:flex w-[680px] lg:h-[650px] bg-hub-white-1 border-2 border-hub-gray-3 rounded-lg flex-col p-4 sm:p-6 lg:p-[30px_20px]">
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-3 sm:gap-4 lg:gap-5 overflow-y-auto mb-4 sm:mb-5 font-pt-caption1-regular flex-1 min-h-0"
        >
          {questions.slice(0, currentQuestionIndex + 1).map((q, i) => {
            const answer = answers[q.questionNumber];
            const isCurrent = i === currentQuestionIndex;

            return (
              <div key={q.questionNumber}>
                <Message
                  isMine={false}
                  message={q.question}
                  enableTyping={isCurrent && !answer}
                  questionNumber={q.questionNumber}
                />
                {answer && <Message isMine message={answer} />}
              </div>
            );
          })}
        </div>

        <div className="p-3 sm:p-4 lg:p-[14px_20px] bg-hub-white-1 border-2 border-hub-gray-3 rounded-xl w-full flex items-center gap-3 flex-shrink-0">
          <textarea
            ref={textAreaRef}
            rows={1}
            value={currentInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isSubmitting}
            className="flex-1 min-h-[1.5em] leading-[1.5] resize-none border-none outline-none overflow-hidden m-0 p-0 block font-pt-caption1-regular placeholder:text-hub-gray-2 text-sm sm:text-base bg-transparent"
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !currentInput.trim()}
            className="px-3 sm:px-4 py-2 rounded-lg font-pt-caption1-medium text-xs sm:text-sm transition-colors flex-shrink-0 min-w-[60px] sm:min-w-[70px]"
            style={{
              backgroundColor: isSubmitting || !currentInput.trim() ? '#D9D9D9' : '#007AFF',
              color: isSubmitting || !currentInput.trim() ? '#999999' : '#FFFFFF'
            }}
          >
            {isSubmitting ? '전송중' : '전송'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BmcStepForm;
