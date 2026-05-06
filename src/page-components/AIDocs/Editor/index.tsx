"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAIDocsEditor } from "./hooks/useAIDocsEditor";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

const AIDocsEditorPage = () => {
  const params = useParams<{ id?: string | string[] }>();
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const parsedId = rawId ? Number(rawId) : NaN;
  const documentId = Number.isFinite(parsedId) && parsedId > 0 ? parsedId : 0;
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("로그인 후 이용하실 수 있습니다.", {
        toastId: "login-required-documents-edit",
      });
      router.push("/sign-in");
    }
  }, [isLoggedIn, router]);

  const {
    document,
    history,
    title,
    setTitle,
    content,
    setContent,
    isLoading,
    isSaving,
    saveState,
    aiPrompt,
    setAiPrompt,
    isAiEditing,
    charCount,
    textareaRef,
    applyWrap,
    saveNow,
    exportFormat,
    setExportFormat,
    exportContent,
    generatePreviewHtml,
    aiEdit,
  } = useAIDocsEditor({ documentId });

  if (!documentId) {
    return (
      <main className="px-6 py-12 text-center text-sm text-hub-gray-2">
        잘못된 문서 경로입니다.
      </main>
    );
  }

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

  if (isLoading) {
    return (
      <main className="w-full mx-auto lg:mx-auto mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px] max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="h-170 animate-pulse rounded-lg border border-hub-gray-3 bg-white" />
          <div className="space-y-4">
            <div className="h-40 animate-pulse rounded-lg border border-hub-gray-3 bg-white" />
            <div className="h-64 animate-pulse rounded-lg border border-hub-gray-3 bg-white" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full mx-auto lg:mx-auto mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px] max-w-7xl px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <section className="rounded-lg border border-hub-gray-3 bg-white p-5">
          <div className="mb-3 flex items-center justify-between border-b border-hub-gray-4 pb-3">
            <div className="flex items-center gap-2 text-sm text-hub-gray-1">
              <button
                type="button"
                onClick={() => applyWrap("**")}
                className="rounded px-2 py-1 hover:bg-hub-gray-4"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => applyWrap("*")}
                className="rounded px-2 py-1 hover:bg-hub-gray-4"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => applyWrap("<u>", "</u>")}
                className="rounded px-2 py-1 hover:bg-hub-gray-4"
              >
                U
              </button>
              <button
                type="button"
                onClick={() => applyWrap("\n- ", "")}
                className="rounded px-2 py-1 hover:bg-hub-gray-4"
              >
                •
              </button>
            </div>
            <p className="text-xs text-hub-gray-2">{saveState}</p>
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 h-12 w-full rounded-md border border-hub-gray-3 px-4 text-[34px] font-semibold outline-none focus:border-hub-primary"
          />

          <div className="mb-3 flex gap-2 border-b border-hub-gray-3 pb-2">
            <button
              type="button"
              onClick={() => setViewMode("edit")}
              className={`px-3 py-2 text-sm font-semibold ${
                viewMode === "edit"
                  ? "border-b-2 border-hub-primary text-hub-primary"
                  : "text-hub-gray-2"
              }`}
            >
              편집
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`px-3 py-2 text-sm font-semibold ${
                viewMode === "preview"
                  ? "border-b-2 border-hub-primary text-hub-primary"
                  : "text-hub-gray-2"
              }`}
            >
              미리보기
            </button>
          </div>

          {viewMode === "edit" ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-140 w-full resize-y rounded-md border border-hub-gray-3 px-4 py-3 text-sm leading-7 outline-none focus:border-hub-primary"
              placeholder="문서 내용을 입력하세요"
            />
          ) : (
            <iframe
              srcDoc={generatePreviewHtml(title, content)}
              className="min-h-140 w-full resize-y rounded-md border border-hub-gray-3 bg-white"
              style={{ minHeight: "500px" }}
            />
          )}

          <div className="mt-4 rounded-md border border-hub-gray-3 p-3">
            <p className="text-sm font-semibold text-hub-gray-1">
              AI 부분 수정
            </p>
            <div className="mt-2 flex gap-2">
              <input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="예: 문체를 더 간결하게 바꿔줘"
                className="h-10 flex-1 rounded-md border border-hub-gray-3 px-3 text-sm outline-none focus:border-hub-primary"
              />
              <button
                type="button"
                onClick={aiEdit}
                disabled={isAiEditing}
                className="h-10 rounded-md bg-hub-primary px-4 text-sm font-semibold text-white disabled:bg-hub-gray-3"
              >
                {isAiEditing ? "적용 중..." : "AI 수정"}
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-hub-gray-3 bg-white p-4">
            <p className="text-sm font-semibold text-hub-gray-1">문서 정보</p>
            <div className="mt-3 space-y-2 text-xs text-hub-gray-2">
              <p className="flex items-center justify-between">
                <span>마지막 수정</span>
                <span>
                  {new Date(
                    document?.updatedAt || Date.now(),
                  ).toLocaleTimeString("ko-KR")}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span>글자 수</span>
                <span>{charCount.toLocaleString()} 자</span>
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-hub-gray-3 bg-white p-4">
            <p className="text-sm font-semibold text-hub-gray-1">
              작업 히스토리
            </p>
            <ul className="mt-3 max-h-60 space-y-2 overflow-auto text-xs text-hub-gray-2">
              {history.length === 0 ? (
                <li>히스토리가 없습니다.</li>
              ) : (
                history.map((item) => (
                  <li key={item.id} className="rounded bg-hub-gray-4 p-2">
                    <p>{item.description}</p>
                    <p className="mt-1 text-[11px]">
                      {new Date(item.createdAt).toLocaleString("ko-KR")}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-hub-gray-1">
              내보내기 형식
            </label>
            <select
              value={exportFormat}
              onChange={(e) =>
                setExportFormat(e.target.value as "pdf" | "docx" | "hwp")
              }
              className="h-10 w-full rounded-md border border-hub-gray-3 px-3 text-sm text-hub-gray-1 outline-none focus:border-hub-primary"
            >
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="hwp">HWP</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={exportContent}
              className="h-10 flex-1 rounded-md border border-hub-primary bg-white text-sm font-semibold text-hub-primary"
            >
              내보내기
            </button>
            <button
              type="button"
              onClick={saveNow}
              disabled={isSaving}
              className="h-10 flex-1 rounded-md bg-hub-primary text-sm font-semibold text-white disabled:bg-hub-gray-3"
            >
              저장
            </button>
          </div>

          <button
            type="button"
            onClick={() => router.push("/documents")}
            className="h-10 w-full rounded-md border border-hub-gray-3 text-sm text-hub-gray-1"
          >
            목록으로
          </button>
        </aside>
      </div>
    </main>
  );
};

export default AIDocsEditorPage;
