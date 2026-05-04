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
        } catch {
          toast.error("BMC 생성 실패");
          setIsGeneratingBmc(false);
        }
      } else {
        moveToNextQuestion();
        setTimeout(scrollToBottom, 200);
      }
    } catch {
      toast.error("전송 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isGeneratingBmc) return <BmcGeneratingSkeleton />;

  if (!currentQuestion) {
    return (
      <div className="flex flex-col">
        <div className="w-[680px] min-h-[650px] bg-hub-white-1 border-2 border-hub-gray-3 rounded-lg flex flex-col justify-between p-[30px_20px]">
          <div className="flex flex-col gap-5 overflow-y-scroll mb-5 font-pt-caption1-regular">
            <Message isMine={false} message="질문을 불러오는 중입니다..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="w-[680px] min-h-[650px] bg-hub-white-1 border-2 border-hub-gray-3 rounded-lg flex flex-col justify-between p-[30px_20px]">
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-5 overflow-y-scroll mb-5 font-pt-caption1-regular"
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

        <div className="p-[14px_20px] bg-hub-white-1 border-2 border-hub-gray-3 rounded-xl w-full">
          <textarea
            ref={textAreaRef}
            rows={1}
            value={currentInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isSubmitting}
            className="w-full min-h-[1.5em] leading-[1.5] resize-none border-none outline-none overflow-hidden m-0 p-0 block font-pt-caption1-regular placeholder:text-hub-gray-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BmcStepForm;
