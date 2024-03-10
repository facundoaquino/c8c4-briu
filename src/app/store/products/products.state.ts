import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { GetProducts } from './products.actions';
import { IProductsState, makeProductsState } from '../../models/product';
import { ProductsService } from '../../services/Products.service';
import { map } from 'rxjs';


@State<IProductsState>({
  name: 'products',
  defaults: makeProductsState({})
})
@Injectable()
export class ProductsState {

  constructor(private readonly productsService: ProductsService) {}

  @Action(GetProducts)
  getProducts(state: StateContext<ProductsState>){
    return this.productsService.getProducts()
    .pipe(map((res)=>console.log(res.data)))
  }
}
