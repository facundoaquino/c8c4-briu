import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { Select, Store } from '@ngxs/store';
import { ProductsState } from '../store/products/products.state';
import { Observable, Subscription } from 'rxjs';
import { IProduct, IProductsState, makeProductsState } from '../models/product';
import { MaterialModule } from '../material/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, MaterialModule, NgxSkeletonLoaderModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  public itemsSkeleton= [1, 2, 3];

  @Select(ProductsState) productsState$!: Observable<IProductsState>;

  public readonly subscription: Subscription = new Subscription();

  public productsState: IProductsState = makeProductsState({});

  public products: IProduct[] = [];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.subscription.add(
      this.productsState$.subscribe(state => {
        this.productsState = state;
        this.products = state.data;
      })
    );
  }

  get isProductsLoading(): boolean {
   return this.productsState.isLoading;
  }
}
