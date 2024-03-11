import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ProductsComponent } from '../products/products.component';
import { Store } from '@ngxs/store';
import { GetProducts } from '../store/products/products.actions';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MaterialModule, ProductsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
  }

}
