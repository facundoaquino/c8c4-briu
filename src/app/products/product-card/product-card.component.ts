import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct, makeProduct } from '../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule
],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct = makeProduct({});

    quantityControl = new FormControl(1);

  constructor() { }


  ngOnInit(): void {
    this.quantityControl.setValue(this.product.minPurchase);
  }

  addToCart() {
  }

  increaseQuantity() {
    this.quantityControl.setValue(this.quantityControl.value! + 1);
  }

  decreaseQuantity() {
    if (this.quantityControl.value! > this.product.minPurchase) {
      this.quantityControl.setValue(this.quantityControl.value! - 1);
    }
  }
}
