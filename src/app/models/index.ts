import { IProductsState } from './product';

export interface IStore {
  products: IProductsState
}

export interface IApiResponse {
  status: string;
  message: string;
}

export interface IApiResponseArray<T> {
  data: T[]
}
