import { BaseResponse } from "@/shared/types/BaseResponse";

export type { BaseResponse };

export interface ChatSession {
  id: number;
  title: string;
  messageCount: number;
  hasDocuments: boolean;
  createdAt: string;
  updatedAt: string;
}

export type MessageRole = "USER" | "ASSISTANT";

export interface ChatMessage {
  id: number;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface ChatDocument {
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  isImage: boolean;
  createdAt: string;
}

export interface ChatSessionDetail {
  id: number;
  title: string;
  messages: ChatMessage[];
  documents: ChatDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionRequest {
  title: string;
}

export interface UpdateSessionTitleRequest {
  title: string;
}


export type GetSessionsResponse = BaseResponse<ChatSession[]>;

export type CreateSessionResponse = ChatSession;

export type GetSessionDetailResponse = ChatSessionDetail;

export type DeleteSessionResponse = BaseResponse<null>;

export type UpdateSessionTitleResponse = BaseResponse<ChatSession>;

export interface StreamMessageRequest {
  message: string;
  files?: File[];
}
