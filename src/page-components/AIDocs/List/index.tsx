"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ReactComponent as DotsIcon } from "@assets/icons/dots.svg";
import { documentApi } from "@/entities/document";
import type { DocumentSummary } from "@/entities/document";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

const formatDate = (date: string) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "-";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

interface DocumentCardProps {
  doc: DocumentSummary;
  onDelete: () => void;
  isMobile?: boolean;
}

const DocumentCard = ({
  doc,
  onDelete,
  isMobile = false,
}: DocumentCardProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleDotsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown((v) => !v);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    if (!window.confirm(`"${doc.title}"을(를) 삭제하시겠습니까?`)) return;

    setIsDeleting(true);
    try {
      await documentApi.deleteDocument(doc.id);
      onDelete();
      toast.success("문서가 삭제되었습니다.");
    } catch {
      toast.error("삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isMobile) {
    // 모바일 리스트 형태
    return (
      <div
        onClick={() => router.push(`/documents/${doc.id}/edit`)}
        className="flex items-center justify-between p-4 bg-white border border-hub-gray-3 rounded-lg cursor-pointer hover:bg-hub-gray-4 transition-colors relative"
      >
        <div className="flex-1">
          <h3 className="font-pt-body2-medium text-hub-black-1 mb-1">
            {doc.title}
          </h3>
          <p className="font-pt-caption2-regular text-hub-gray-2">
            {formatDate(doc.updatedAt || doc.createdAt)}
          </p>
        </div>

        {/* 점 메뉴 버튼 */}
        <button
          onClick={handleDotsClick}
          className={[
            "ml-4 p-2 bg-transparent border-none flex items-center justify-center transition-opacity duration-200 [&_svg]:fill-hub-gray-2",
            isDeleting
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:opacity-70",
          ].join(" ")}
        >
          <DotsIcon width={20} height={20} />
        </button>

        {/* 드롭다운 */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-[50px] right-4 bg-hub-white-1 border border-hub-gray-3 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[100] overflow-hidden min-w-[120px]"
          >
            <button
              onClick={handleDelete}
              className="w-full px-4 py-[10px] bg-transparent border-none text-left cursor-pointer font-pt-caption1-regular text-hub-error hover:bg-hub-gray-4 transition-colors duration-200"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    );
  }

  // 데스크탑 카드 형태
  return (
    <div
      onClick={() => router.push(`/documents/${doc.id}/edit`)}
      className="flex items-center justify-between p-4 bg-white border border-hub-gray-3 rounded-lg cursor-pointer hover:bg-hub-gray-4 transition-colors relative"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-pt-body2-medium text-hub-black-1 mb-1 truncate">
          {doc.title}
        </h3>
        <p className="font-pt-caption2-regular text-hub-gray-2">
          {formatDate(doc.updatedAt || doc.createdAt)}
        </p>
      </div>

      {/* 점 메뉴 버튼 */}
      <button
        onClick={handleDotsClick}
        className={[
          "ml-4 p-2 bg-transparent border-none flex items-center justify-center transition-opacity duration-200 [&_svg]:fill-hub-gray-2",
          isDeleting
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:opacity-70",
        ].join(" ")}
      >
        <DotsIcon width={20} height={20} />
      </button>

      {/* 드롭다운 */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-[50px] right-4 bg-hub-white-1 border border-hub-gray-3 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[100] overflow-hidden min-w-[120px]"
        >
          <button
            onClick={handleDelete}
            className="w-full px-4 py-[10px] bg-transparent border-none text-left cursor-pointer font-pt-caption1-regular text-hub-error hover:bg-hub-gray-4 transition-colors duration-200"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

const AIDocsListPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("로그인 후 이용하실 수 있습니다.", {
        toastId: "login-required-documents",
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

  const fetchDocuments = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const res = await documentApi.getDocuments();
      setDocuments(res.data ?? []);
    } catch {
      toast.error("문서 목록을 불러오지 못했습니다.");
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchDocuments();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <p className="font-pt-h2-semibold mb-5">최근 문서</p>

        {isLoading ? (
          <>
            {/* 모바일 스켈레톤 */}
            <div className="block lg:hidden w-full">
              <div className="space-y-3 mb-10">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-white border border-hub-gray-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="w-37.5 h-4 rounded bg-hub-gray-4 animate-pulse" />
                      <div className="w-25 h-3 mt-2 rounded bg-hub-gray-4 animate-pulse" />
                    </div>
                    <div className="ml-4 w-5 h-5 rounded bg-hub-gray-4 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* 데스크탑 스켈레톤 */}
            <div className="hidden lg:block lg:space-y-3 mb-10">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white border border-hub-gray-3 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="w-48 h-4 rounded bg-hub-gray-4 animate-pulse" />
                    <div className="w-32 h-3 mt-2 rounded bg-hub-gray-4 animate-pulse" />
                  </div>
                  <div className="ml-4 w-5 h-5 rounded bg-hub-gray-4 animate-pulse" />
                </div>
              ))}
            </div>
          </>
        ) : documents.length === 0 ? (
          <div className="text-center py-10 text-hub-gray-2">
            <p>생성된 문서가 없습니다.</p>
            <button
              onClick={() => router.push("/documents/new")}
              className="mt-4 inline-block px-4 py-2 bg-hub-primary text-white rounded-lg transition-colors"
            >
              새 문서 만들기
            </button>
          </div>
        ) : (
          <>
            {/* 리스트 뷰 */}
            <div className="w-full">
              <div className="space-y-3 mb-10">
                <button
                  type="button"
                  onClick={() => router.push("/documents/new")}
                  className="w-full flex items-center justify-between p-4 bg-hub-primary text-white rounded-lg transition-colors cursor-pointer font-pt-body2-medium"
                >
                  <span>새 문서 만들기</span>
                  <span className="text-xl">+</span>
                </button>

                {documents.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    doc={doc}
                    onDelete={() => fetchDocuments(false)}
                    isMobile={true}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AIDocsListPage;
