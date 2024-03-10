import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { Select, Store } from '@ngxs/store';
import { GetProducts } from '../store/products/products.actions';
import { ProductsState } from '../store/products/products.state';
import { Observable, Subscription } from 'rxjs';
import { IProductsState, makeProductsState } from '../models/product';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, MaterialModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  @Select(ProductsState) productsState$!: Observable<IProductsState>;

  public readonly subscription: Subscription = new Subscription();

  public productsState: IProductsState = makeProductsState({});

  constructor(private readonly store: Store){}

  ngOnInit(): void {
    this.subscription.add(
      this.productsState$.subscribe( state => {
        this.productsState = state;
      })
    )
  }

  get isProductsLoading(): boolean{
   return this.productsState.isLoading;
  }
}
