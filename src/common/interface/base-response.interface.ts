import { pagination } from './base-page.interface';

export interface BaseResponse<T> {
  statusCode: number;
  message?: string;
  pagination?: pagination<T>;
  data?: T;
}
