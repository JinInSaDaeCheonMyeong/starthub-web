import { useState, useRef, useEffect } from "react";
import { useBmcStore } from "@/entities/bmc/model/useBmcStore";
import * as S from "./style";
import { StepFormProps } from "../model/types";

const BmcStepForm = ({
  stepId,
  placeholder,
}: StepFormProps) => {
  const { getStepData, setStepData, markStepCompleted, nextStep } = useBmcStore();
  const [answer, setAnswer] = useState(getStepData(stepId)?.answers?.[0] || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    });
  }, [stepId]);

const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const el = e.target;
  setAnswer(el.value);

  if (isSubmitting) return;

  // 높이 자동 조절
  el.style.height = "auto";
  const style = window.getComputedStyle(el);
  const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  const lineHeight = parseFloat(style.lineHeight);
  const maxHeight = lineHeight * 4 + padding;

  const newHeight = Math.min(el.scrollHeight, maxHeight);
  el.style.height = `${newHeight}px`;

  // 4줄 초과일 때만 스크롤바 이동
  if (el.scrollHeight > maxHeight) {
    el.scrollTop = el.scrollHeight;
    el.style.overflowY = "auto";
  } else {
    el.style.overflowY = "hidden";
  }
};

  const isLastStep = stepId === "cost-structure";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      
      if (!isSubmitting && answer.trim()) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setStepData(stepId, {
      answers: [answer.trim()],
      isCompleted: true,
    });
    markStepCompleted(stepId);

    if (!isLastStep) {
      setTimeout(() => {
        nextStep();
        setIsSubmitting(false);
      }, 100);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <S.FormContainer>
      <S.ChatContainer>
        <S.MessagesContainer>
        </S.MessagesContainer>
        <S.TextAreaContainer>
          <S.TextArea
            ref={textAreaRef}
            rows={1}
            onKeyDown={handleKeyDown}
            value={answer}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </S.TextAreaContainer>
      </S.ChatContainer>
    </S.FormContainer>
  );
};

export default BmcStepForm;
