import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ProductsComponent } from '../products/products.component';
import { Select, Store } from '@ngxs/store';
import { GetProducts } from '../store/products/products.actions';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProductsState } from '../models/product';
import { ProductsState } from '../store/products/products.state';
import { NgImageSliderModule } from 'ng-image-slider';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MaterialModule, ProductsComponent, NgImageSliderModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  @Select(ProductsState) productsState$!: Observable<IProductsState>;
  public subscription: Subscription = new Subscription();
  public orderQuantity: number = 0;

  constructor(
    private readonly store: Store,
    private readonly router: Router
    ) { }
  imageObject: Array<object> = [{
    image: '../../assets/brands/brand2.png',
    thumbImage: '../../assets/brands/brand2.png',
    alt: 'Boriu',
}, {
  image: '../../assets/brands/brand8.png',
  thumbImage: '../../assets/brands/brand8.png',
  alt: 'Boriu',
}, {
  image: '../../assets/brands/brand3.png',
  thumbImage: '../../assets/brands/brand3.png',
  alt: 'Boriu',
}, {
  image: '../../assets/brands/brand4.png',
  thumbImage: '../../assets/brands/brand4.png',
  alt: 'Boriu',
}, {
  image: '../../assets/brands/brand5.png',
  thumbImage: '../../assets/brands/brand5.png',
  alt: 'Boriu',
}, {
  image: '../../assets/brands/brand6.png',
  thumbImage: '../../assets/brands/brand6.png',
  alt: 'Boriu',
}, {
  image: '../../assets/brands/brand7.png',
  thumbImage: '../../assets/brands/brand7.png',
  alt: 'Boriu',
}
];

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
    this.subscription.add(
      this.productsState$.subscribe((state) => {
          this.orderQuantity = state.order.length;
      })
  );
  }

  goToCart() {
    this.router.navigateByUrl('/new-order');
  }
}
