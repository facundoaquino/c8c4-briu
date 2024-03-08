import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { Store } from '@ngxs/store';
import { GetProducts } from '../store/products/products.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  constructor(private readonly store: Store){}

  ngOnInit(): void {
      this.store.dispatch(new GetProducts());
  }
}
