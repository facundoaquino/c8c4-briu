import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { DeleteOrder, GetProducts, GetProductsSuccess, SaveOrderForm, UploadLogo, UploadLogoSuccess } from './products.actions';
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
  getProducts(stateContext: StateContext<IProductsState>) {

    const state = stateContext.getState();
    stateContext.setState({
      ...state,
      data: [makeProduct({})],
      isLoading: true,
      hasErrors: false
    });
    return this.productsService.getProducts()
    .pipe(
      map((res)=>res.data),
      mergeMap(products => stateContext.dispatch(new GetProductsSuccess({ products })))
    );
  }


  @Action(GetProductsSuccess)
  getProductsSuccess(stateContext: StateContext<IProductsState>, action: GetProductsSuccess) {

    const state = stateContext.getState();
    stateContext.setState({
      ...state,
      data: action.payload.products,
      isLoading: false,
      hasErrors: false
    });
  }

  @Action(DeleteOrder)
  deleteOrder(stateContext: StateContext<IProductsState>, action: DeleteOrder) {

    const state = stateContext.getState();

    const filteredOrders = state.order.filter(order => order.productId !== action.payload.id);

    stateContext.setState({
      ...state,
      order: [
        ...filteredOrders,
      ]
    });
  }

  @Action(SaveOrderForm)
  saveOrderForm(stateContext: StateContext<IProductsState>, action: SaveOrderForm) {

    const state = stateContext.getState();

    const filteredOrders = state.order.filter(order => order.productId !== action.payload.order.productId);

    stateContext.setState({
      ...state,
      order: [
        ...filteredOrders,
        action.payload.order
      ]
    });


  }

  @Action(UploadLogo)
  uploadLogo(stateContext: StateContext<IProductsState>, action: UploadLogo) {

    return this.productsService.uploadLogo(action.payload.file, action.payload.name, action.payload.lastname)
    .pipe(
      map((res)=>res),
      mergeMap(response => stateContext.dispatch(new UploadLogoSuccess(response)))
    );
  }

  @Action(UploadLogoSuccess)
  uploadLogoSuccess(stateContext: StateContext<IProductsState>, action: UploadLogoSuccess) {
  }
}
