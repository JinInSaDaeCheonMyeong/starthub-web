"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAIDocsQuestions } from "./hooks/useAIDocsQuestions";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

const toneChips = [
  { label: "전문적이고 신뢰감 있는", value: "PROFESSIONAL" },
  { label: "감성적이고 설득력 있는", value: "EMOTIONAL" },
  { label: "쉽고 명확한", value: "SIMPLE" },
];

const AIDocsQuestionsPage = () => {
  const params = useParams<{ id?: string | string[] }>();
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const parsedId = rawId ? Number(rawId) : NaN;
  const documentId = Number.isFinite(parsedId) && parsedId > 0 ? parsedId : 0;

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("로그인 후 이용하실 수 있습니다.", {
        toastId: "login-required-documents-questions",
      });
      router.push("/sign-in");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
        <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
          <div className="min-h-[60vh] flex justify-center items-center">
            <div className="text-center">
              <p className="font-pt-body2-medium text-hub-gray-2">
                로그인 페이지로 이동 중...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    questions,
    answers,
    toneType,
    isLoading,
    isGenerating,
    isReady,
    setTextAnswer,
    selectTone,
    generateDocument,
  } = useAIDocsQuestions({ documentId });

  const handleGenerate = async () => {
    const generatedDocumentId = await generateDocument();
    if (!generatedDocumentId) return;
    router.push(`/documents/${generatedDocumentId}/edit`);
  };

  if (!documentId) {
    return (
      <main className="px-6 py-12 text-center text-sm text-hub-gray-2">
        잘못된 문서 경로입니다.
      </main>
    );
  }

  return (
    <main className="w-full mx-auto lg:mx-auto mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px] max-w-225 px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-hub-gray-1">
          질문에 답하면 AI가 문서를 생성합니다
        </h1>
        <p className="mt-2 text-sm text-hub-gray-2">
          템플릿 기반 질문에 답변을 채운 뒤 문서를 생성하세요.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="h-28 animate-pulse rounded-lg border border-hub-gray-3 bg-hub-white-1"
            />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="rounded-lg border border-hub-gray-3 bg-white p-8 text-center">
          <p className="text-sm text-hub-gray-2">
            질문이 아직 생성되지 않았습니다. 템플릿 업로드를 확인해주세요.
          </p>
          <button
            type="button"
            className="mt-4 rounded-md border border-hub-primary px-4 py-2 text-sm font-semibold text-hub-primary"
            onClick={() => router.push("/documents/new")}
          >
            업로드 화면으로
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {questions.map((q, index) => {
            const isToneQuestion = /tone|manner|톤앤매너/i.test(q.questionText);

            return (
              <section
                key={q.id}
                className="rounded-lg border border-hub-gray-3 bg-white p-4"
              >
                <p className="text-sm font-semibold text-hub-gray-1">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-hub-primary text-xs text-white">
                    {index + 1}
                  </span>
                  {q.questionText}
                </p>

                {isToneQuestion ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {toneChips.map((chip) => (
                      <button
                        key={chip.value}
                        type="button"
                        onClick={() => {
                          selectTone(q.id, chip.value, chip.label);
                        }}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                          toneType === chip.value
                            ? "bg-hub-primary text-white"
                            : "bg-hub-gray-4 text-hub-gray-1"
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    value={answers[q.id] || ""}
                    onChange={(e) => setTextAnswer(q.id, e.target.value)}
                    placeholder="답변을 입력하세요"
                    className="mt-4 min-h-22.5 w-full rounded-md border border-hub-gray-3 px-3 py-2 text-sm outline-none focus:border-hub-primary resize-none"
                  />
                )}
              </section>
            );
          })}

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !isReady}
              className="h-11 min-w-45 rounded-md bg-hub-primary px-6 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-hub-gray-3"
            >
              {isGenerating ? "생성 중..." : "문서 생성하기"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AIDocsQuestionsPage;
