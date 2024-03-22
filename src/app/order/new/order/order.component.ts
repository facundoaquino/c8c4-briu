import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IOrder, IProductsState } from '../../../models/product';
import { ProductsState } from '../../../store/products/products.state';
import { IStore } from '../../../models';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  @Select(ProductsState) productsState$!: Observable<IProductsState>;
  public orders: IOrder[] = [];


  constructor(
    private readonly store: Store,
    private readonly router: Router
    ) {}

  ngOnInit(): void {
    this.store.selectSnapshot((state: IStore) => {
      this.orders = state.products.order;
    }
    );
  }

  get totalPrice(): number {
    return this.orders.reduce((ord1, ord2: IOrder) =>{
      return ord1 + ord2.totalPrice;}, 0);
  }

  imageUrl(order: IOrder): string {
    const products = this.store.selectSnapshot((state:IStore) => state.products.data);
    const product = products.find(prod => prod.id === order.productId)!;
    return `../../../assets/${ product.imageName}`;
  }


  nextStep() {
    this.router.navigateByUrl('order-form');
  }

  onBack() {
    this.router.navigateByUrl('/#products');
  }
}
