import { IApiResponse } from '../../models';
import { IProduct, IOrder, IRequestUploadLogo } from '../../models/product';

export class GetProducts {
  static readonly type = '[Products] Get products';
  constructor() { }
}

export class GetProductsSuccess {
  static readonly type = '[Products] Get products success';
  constructor(public readonly payload: { products: IProduct[]}) { }
}

export class SaveOrderForm {
  static readonly type = '[Products] Save Order Form';
  constructor(public readonly payload: { order: IOrder}) { }
}

export class DeleteOrder {
  static readonly type = '[Products] Delete Order';
  constructor(public readonly payload: { id: number}) { }
}

export class UploadLogo {
  static readonly type = '[Products] Upload logo';
  constructor(public readonly payload: IRequestUploadLogo) { }
}

export class UploadLogoSuccess {
  static readonly type = '[Products] Upload logo success';
  constructor(public readonly payload: IApiResponse) { }
}
