import { IApiResponseArray } from '.';

export interface IProduct {
  id: number;
  imageName: string;
  name: string;
  description: string;
  price: number;
  minPurchase: number;
  image: string;
  category: string;
  brand: string;
  stock: number;
}
export interface IRequestUploadLogo {
  file: File;
  name: string;
  lastname: string;
}

export function makeProduct(product: Partial<IProduct>): IProduct {
 const defaultProduct: IProduct = {
  id: 0,
  name: '',
  imageName: '',
  description: '',
  minPurchase: 0,
  price: 0,
  image: '',
  category: '',
  brand: '',
  stock: 0,
 };

 return { ...defaultProduct, ...product };
}


export interface IProductsState {
  data: IProduct[];
  isLoading: boolean;
  hasErrors: boolean;
  order: IOrder[];
}

export function makeProductsState(productState: Partial<IProductsState>):IProductsState {

  const defaultState: IProductsState = {
    data: [makeProduct({})],
    isLoading: false,
    hasErrors: false,
    order: [],
  };

  return { ...defaultState, ...productState };

}

export interface IOrder {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export function makeOrder(orderState: Partial<IOrder>):IOrder {

  const defaultState: IOrder = {
    productId: 0,
    productName: '',
    quantity: 0,
    unitPrice: 0,
    totalPrice: 0,
  };

  return { ...defaultState, ...orderState };

}


export interface IProductsResponse extends IApiResponseArray<IProduct> {}
