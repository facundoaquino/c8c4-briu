import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { GetProducts, GetProductsSuccess } from './products.actions';
import { IProductsState, makeProduct, makeProductsState } from '../../models/product';
import { ProductsService } from '../../services/Products.service';
import { map, mergeMap } from 'rxjs';


@State<IProductsState>({
  name: 'products',
  defaults: makeProductsState({})
})
@Injectable()
export class ProductsState {

  constructor(private readonly productsService: ProductsService) {}

  @Action(GetProducts)
  getProducts(stateContext: StateContext<IProductsState>){

    const state = stateContext.getState();
    stateContext.setState({
      ...state,
      data: [makeProduct({})],
      isLoading: true,
      hasErrors:false
    })
    return this.productsService.getProducts()
    .pipe(
      map((res)=>res.data),
      mergeMap(products => stateContext.dispatch(new GetProductsSuccess({products})))
    )
  }

  @Action(GetProductsSuccess)
  getProductsSuccess(stateContext: StateContext<IProductsState>, action: GetProductsSuccess){

    const state = stateContext.getState();
    stateContext.setState({
      ...state,
      data: action.payload.products,
      isLoading: false,
      hasErrors:false
    })
  }
}
