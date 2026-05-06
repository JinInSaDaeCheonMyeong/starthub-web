import type {
  DocumentHistoryResponse,
  DocumentListResponse,
  DocumentQuestionListResponse,
} from "./model/document.type";

export const DOCUMENT_QUERY_KEYS = {
  document: {
    all: () => ["document", "all"] as const,
    detail: (documentId: number) => ["document", "detail", documentId] as const,
    questions: (documentId: number) =>
      ["document", "questions", documentId] as const,
    history: (documentId: number) =>
      ["document", "history", documentId] as const,
  },
};

export type DocumentListQueryKey = ReturnType<
  typeof DOCUMENT_QUERY_KEYS.document.all
>;
export type DocumentDetailQueryKey = ReturnType<
  typeof DOCUMENT_QUERY_KEYS.document.detail
>;
export type DocumentQuestionsQueryKey = ReturnType<
  typeof DOCUMENT_QUERY_KEYS.document.questions
>;
export type DocumentHistoryQueryKey = ReturnType<
  typeof DOCUMENT_QUERY_KEYS.document.history
>;

export type {
  DocumentListResponse,
  DocumentQuestionListResponse,
  DocumentHistoryResponse,
};
