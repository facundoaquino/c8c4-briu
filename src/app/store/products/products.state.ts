import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { GetProducts } from './products.actions';
import { IProductsState, makeProductsState } from '../../models/product';


@State<IProductsState>({
  name: 'products',
  defaults: makeProductsState({})
})
@Injectable()
export class ProductsState {

  @Action(GetProducts)
  getProducts(state: StateContext<ProductsState>){
  }
}
