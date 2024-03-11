import { ProductsState } from '../store/products/products.state';

export interface IStore {
  procuts: ProductsState
}

export interface IApiResponseArray<T> {
  data: T[]
}
