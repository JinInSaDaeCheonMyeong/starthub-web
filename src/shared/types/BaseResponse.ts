export interface BaseResponse<T = null> {
  data: T;
  status: string;
  message: string;
  statusCode: number;
}