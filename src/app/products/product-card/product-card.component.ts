import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule
],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: any;
    quantityControl = new FormControl(1);

  constructor() { }

  addToCart() {
    // console.log('Agregar al carrito', this.quantityControl);
  }

  increaseQuantity() {
    this.quantityControl.setValue(this.quantityControl.value! + 1);
  }

  decreaseQuantity() {
    if (this.quantityControl.value! > 0) {
      this.quantityControl.setValue(this.quantityControl.value! - 1);
    }
  }
}
