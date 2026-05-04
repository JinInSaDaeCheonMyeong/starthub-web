"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { documentApi } from "@/entities/document";
import type { DocumentSummary } from "@/entities/document";

const formatDate = (date: string) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "-";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

const AIDocsListPage = () => {
  const router = useRouter();
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const res = await documentApi.getDocuments();
        if (!isMounted) return;
        setDocuments(res.data ?? []);
      } catch {
        toast.error("문서 목록을 불러오지 못했습니다.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDocuments();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="w-5xl mt-10 min-h-[50vh]">
      <p className="font-pt-h2-semibold mb-5">최근 문서</p>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-5 mb-10 max-w-5xl">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="w-60.5 h-42.5 rounded-[10px] border border-hub-gray-3 bg-hub-gray-4 animate-pulse" />
              <div className="w-37.5 h-4 mt-2 rounded border border-hub-gray-3 bg-hub-gray-4 animate-pulse" />
              <div className="w-25 h-3 mt-1 rounded border border-hub-gray-3 bg-hub-gray-4 animate-pulse" />
            </div>
          ))}
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-10 text-hub-gray-2">생성된 문서가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-4 gap-5 mb-10 max-w-5xl">
          <button
            type="button"
            onClick={() => router.push("/documents/new")}
            className="flex flex-col items-center justify-center w-60.5 h-42.5 rounded-[10px] border border-hub-gray-3 bg-hub-white-1 text-hub-primary transition hover:opacity-50 hover:cursor-pointer"
          >
            <span className="text-5xl font-light">+</span>
          </button>

          {documents.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => router.push(`/documents/${doc.id}/edit`)}
              className="flex flex-col text-left transition hover:opacity-50"
            >
              <div className="w-60.5 h-42.5 rounded-[10px] border border-hub-gray-3 bg-linear-to-br from-[#eff5ff] to-[#dbe8ff] flex items-center justify-center">
                <div className="w-30 h-21.5 rounded border border-[#c2d6ff] bg-white shadow-sm" />
              </div>
              <p className="truncate text-sm font-semibold text-hub-gray-1 mt-2">
                {doc.title}
              </p>
              <p className="text-xs text-hub-gray-2 mt-1">
                {formatDate(doc.updatedAt || doc.createdAt)}
              </p>
            </button>
          ))}
        </div>
      )}
    </main>
  );
};

export default AIDocsListPage;
