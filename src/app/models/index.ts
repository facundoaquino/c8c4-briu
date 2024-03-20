import { ProductsState } from '../store/products/products.state';
import { IProductsState } from './product';

export interface IStore {
  products: IProductsState
}

export interface IApiResponseArray<T> {
  data: T[]
}
