export interface BaseResponse<T> {
  data: T;
  status: string;
  message: string;
  statusCode: number;
}