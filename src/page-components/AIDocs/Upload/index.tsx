"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { documentApi } from "@/entities/document";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const defaultTitle = () => {
  const today = new Date();
  const ymd = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return `새 문서 ${ymd}`;
};

const AIDocsUploadPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState(defaultTitle());
  const [documentType, setDocumentType] = useState("PLAN");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileSizeLabel = useMemo(() => {
    if (!file) return "";
    return `${(file.size / 1024 / 1024).toFixed(2)} MB`;
  }, [file]);

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE) {
      toast.error("파일은 최대 20MB까지 업로드할 수 있습니다.");
      return;
    }

    setFile(selected);
  };

  const createDocument = async () => {
    const res = await documentApi.createDocument({
      title: title.trim() || defaultTitle(),
      documentType,
    });
    return res.data.id;
  };

  const handleSkip = async () => {
    try {
      setIsSubmitting(true);
      const documentId = await createDocument();
      router.push(`/documents/${documentId}/questions`);
    } catch {
      toast.error("문서를 생성하지 못했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (!file) {
      toast.info("템플릿 파일을 업로드하거나 건너뛰기를 선택해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const documentId = await createDocument();

      const formData = new FormData();
      formData.append("file", file);

      await documentApi.uploadTemplate(documentId, formData);
      router.push(`/documents/${documentId}/questions`);
    } catch {
      toast.error("템플릿 업로드에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full max-w-195 px-6 py-10">
      <div className="text-center">
        <h1 className="text-[40px] font-bold leading-tight text-hub-primary">
          템플릿을 업로드하세요.
        </h1>
        <p className="mt-3 text-sm text-hub-gray-2">
          지원 사업 계획서 양식 파일을 업로드하면 파일 기반으로 질문을
          생성합니다.
        </p>
      </div>

      <section className="mx-auto mt-8 w-full rounded-xl border border-hub-gray-3 bg-white p-5">
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-hub-gray-1">문서 제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 rounded-md border border-hub-gray-3 px-3 outline-none focus:border-hub-primary"
              placeholder="문서 제목을 입력하세요"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-hub-gray-1">문서 유형</span>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="h-10 rounded-md border border-hub-gray-3 px-3 outline-none focus:border-hub-primary"
            >
              <option value="PLAN">사업계획서</option>
              <option value="PROPOSAL">제안서</option>
              <option value="REPORT">보고서</option>
            </select>
          </label>
        </div>

        <div className="rounded-lg border border-dashed border-hub-gray-3 p-6 text-center">
          <p className="text-sm text-hub-gray-1">
            여기로 파일을 드래그하거나 업로드하세요
          </p>
          <p className="mt-2 text-xs text-hub-gray-2">
            PDF, DOCX, HWP 형식 지원 (최대 20MB)
          </p>

          <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-md bg-hub-gray-4 px-4 py-2 text-xs font-semibold text-hub-gray-1 hover:bg-hub-gray-3">
            파일 선택하기
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.hwp"
              onChange={handleSelectFile}
            />
          </label>
        </div>

        {file && (
          <div className="mt-4 flex items-center justify-between rounded-md bg-hub-gray-4 px-3 py-2 text-sm">
            <div>
              <p className="font-medium text-hub-gray-1">{file.name}</p>
              <p className="text-xs text-hub-gray-2">{fileSizeLabel}</p>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-xs text-hub-gray-2 hover:text-hub-black-1"
            >
              제거
            </button>
          </div>
        )}
      </section>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="h-11 min-w-37.5 rounded-md bg-hub-primary px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-hub-gray-3"
        >
          {isSubmitting ? "처리 중..." : "다음 단계"}
        </button>
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSubmitting}
          className="h-11 min-w-37.5 rounded-md border border-hub-primary bg-white px-5 text-sm font-semibold text-hub-primary disabled:cursor-not-allowed disabled:border-hub-gray-3 disabled:text-hub-gray-2"
        >
          건너뛰기
        </button>
      </div>
    </main>
  );
};

export default AIDocsUploadPage;
