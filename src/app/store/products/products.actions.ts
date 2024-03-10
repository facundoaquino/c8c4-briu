import { IProduct } from '../../models/product';

export class GetProducts {
  static readonly type = '[Products] Get products';
  constructor() { }
}

export class GetProductsSuccess {
  static readonly type = '[Products] Get products success';
  constructor(public readonly payload: { products: IProduct[]}) { }
}
