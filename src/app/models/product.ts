import { IApiResponseArray } from '.';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  stock: number;
}

export function makeProduct(product: Partial<IProduct>): IProduct {
 const defaultProduct: IProduct = {
  id: 0,
  name: '',
  description: '',
  price: 0,
  image: '',
  category: '',
  brand: '',
  stock: 0,
 }

 return { ...defaultProduct, ...product }
}


export interface IProductsState {
  products: IProduct[];
}

export function makeProductsState(productState: Partial<IProductsState>):IProductsState {

  const defaultState: IProductsState = {
    products: [makeProduct({})]
  }

  return { ...defaultState, ...productState }

}


export interface IProductsResponse extends IApiResponseArray<IProduct> {}
