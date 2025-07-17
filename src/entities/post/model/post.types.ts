export interface postData {
  id: number;
  title: string;
  companyName: string;
  endDate: string;
  viewCount: number;
  isClosed: boolean;
  createdAt: string;
}

// 페이징 응답을 위한 타입
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  pageable: Pageable;
  sort: Pageable["sort"];
  numberOfElements: number;
}

export interface BaseResponse<T> {
  data: T;
  message: string;
  status: string;
  statusCode: number;
}