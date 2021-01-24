import { AxiosError, AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
}

export interface PaginateApiResponse<T> {
  statusCode: number;
  data: PaginateResult<T>;
}

export interface PaginateResult<T> {
  data: T[];
  total: number;
  pageSize: number;
  pageNo: number;
  totalPages: number;
  nextPage?: number | null;
  prevPage?: number | null;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  meta?: any;
}

export interface Timestamp {
  createdAt: number;
  updatedAt: number;
}

export type DateRange = [string | number, string | number];

export type DateRangeQuery = {
  createdAt?: DateRange;
  updatedAt?: DateRange;
};

export enum Order {
  ASC = 1,
  DESC = -1
}

export interface Pagination<T = any> {
  pageNo?: number;
  pageSize?: number;
  sort?: string | Record<keyof T, Order>;
}

export interface Search {
  search?: string;
}

interface ApiErrorValue {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export interface ApiError extends Omit<AxiosError, 'response'> {
  response?: AxiosResponse<ApiErrorValue | string>;
}