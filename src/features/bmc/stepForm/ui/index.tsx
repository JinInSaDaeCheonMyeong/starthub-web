import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
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
  const navigate = useNavigate();
  const currentQuestion = getCurrentQuestion();
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;

  useEffect(() => {
    requestAnimationFrame(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    });
  }, [stepId]);

  useEffect(() => {
    if (currentQuestion) {
      setCurrentInput("");
    }
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
    setCurrentInput(el.value);

    if (isSubmitting) return;

    el.style.height = "auto";
    const style = window.getComputedStyle(el);
    const padding =
      parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const lineHeight = parseFloat(style.lineHeight);
    const maxHeight = lineHeight * 4 + padding;

    const newHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${newHeight}px`;

    if (el.scrollHeight > maxHeight) {
      el.scrollTop = el.scrollHeight;
      el.style.overflowY = "auto";
    } else {
      el.style.overflowY = "hidden";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();

      if (!isSubmitting && currentInput.trim()) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    if (!currentInput.trim() || !currentQuestion) return;

    const sessionData = getSessionId();

    if (!sessionData) {
      toast.error("세션이 없습니다. 새로운 BMC를 생성해주세요.");
      navigate("/bmc");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitAnswer(currentQuestion.questionNumber, currentInput.trim());

      setTimeout(() => {
        scrollToBottom();
      });

      if (isLastQuestion) {
        try {
          setIsGeneratingBmc(true);

          const bmcResponse = await bmcApi.generateBmc({
            sessionId: sessionData.sessionId,
          });


          const bmcId = bmcResponse.data.id;
          toast.success("BMC가 성공적으로 생성되었습니다!");

          navigate(`/bmc/detail/${bmcId}`);
        } catch {
          toast.error("BMC 생성에 실패했습니다. 다시 시도해주세요.");
          setIsGeneratingBmc(false);
        }
      } else {
        moveToNextQuestion();

        setTimeout(() => {
          scrollToBottom();
        }, 200);
      }
    } catch {
      toast.error("답변 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isGeneratingBmc) {
    return <BmcGeneratingSkeleton />;
  }

  if (!currentQuestion) {
    return (
      <S.FormContainer>
        <S.ChatContainer>
          <S.MessagesContainer>
            <Message isMine={false} message="질문을 불러오는 중입니다..." />
          </S.MessagesContainer>
        </S.ChatContainer>
      </S.FormContainer>
    );
  }

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.questionNumber]
    : "";

  return (
    <S.FormContainer>
      <S.ChatContainer>
        <S.MessagesContainer ref={messagesContainerRef}>
          {questions.slice(0, currentQuestionIndex).map((question) => {
            const answer = answers[question.questionNumber];
            return (
              <div key={question.questionNumber}>
                <Message
                  isMine={false}
                  message={question.question}
                  enableTyping={false}
                  questionNumber={question.questionNumber}
                />
                {answer && <Message isMine={true} message={answer} />}
              </div>
            );
          })}

          <Message
            isMine={false}
            message={currentQuestion.question}
            enableTyping={true}
            questionNumber={currentQuestion.questionNumber}
          />

          {currentAnswer && <Message isMine={true} message={currentAnswer} />}
        </S.MessagesContainer>
        <S.TextAreaContainer>
          <S.TextArea
            ref={textAreaRef}
            rows={1}
            onKeyDown={handleKeyDown}
            value={currentInput}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={isSubmitting}
          />
        </S.TextAreaContainer>
      </S.ChatContainer>
    </S.FormContainer>
  );
};

export default BmcStepForm;
