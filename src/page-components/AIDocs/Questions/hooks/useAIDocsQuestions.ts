import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { documentApi } from "@/entities/document";
import type { DocumentQuestion, ToneType } from "@/entities/document";

type UseAIDocsQuestionsParams = {
  documentId: number;
};

export const useAIDocsQuestions = ({
  documentId,
}: UseAIDocsQuestionsParams) => {
  const [questions, setQuestions] = useState<DocumentQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [toneType, setToneType] = useState<ToneType>("PROFESSIONAL");
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!documentId) return;

    let isMounted = true;

    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const res = await documentApi.getDocumentQuestions(documentId);
        if (!isMounted) return;
        setQuestions(res.data ?? []);
      } catch {
        toast.error("질문 목록을 불러오지 못했습니다.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, [documentId]);

  const requiredQuestionIds = useMemo(
    () => questions.filter((q) => q.required).map((q) => q.id),
    [questions],
  );

  const isReady = useMemo(() => {
    if (!requiredQuestionIds.length) return true;
    return requiredQuestionIds.every(
      (id) => (answers[id] || "").trim().length > 0,
    );
  }, [answers, requiredQuestionIds]);

  const setTextAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const selectTone = (
    questionId: number,
    toneValue: ToneType,
    toneLabel: string,
  ) => {
    setToneType(toneValue);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: toneLabel,
    }));
  };

  const generateDocument = async () => {
    if (!documentId) return null;

    if (!isReady) {
      toast.info("필수 질문에 답변을 입력해주세요.");
      return null;
    }

    try {
      setIsGenerating(true);

      const payloadAnswers = questions.map((q) => ({
        questionId: q.id,
        answer: (answers[q.id] || "").trim(),
      }));

      await documentApi.generateDocument(documentId, {
        answers: payloadAnswers,
        toneType,
      });

      return documentId;
    } catch {
      toast.error("문서 생성에 실패했습니다.");
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    questions,
    answers,
    toneType,
    isLoading,
    isGenerating,
    isReady,
    setTextAnswer,
    selectTone,
    generateDocument,
  } as const;
};
