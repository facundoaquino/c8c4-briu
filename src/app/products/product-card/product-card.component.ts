import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct, makeProduct, IOrder } from '../../models/product';
import { SaveOrderForm } from '../../store/products/products.actions';
import { Store } from '@ngxs/store';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private readonly store: Store,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.quantityControl.setValue(this.product.minPurchase);
  }

  addToCart() {
    this.store.dispatch(new SaveOrderForm({ order: this.buildOrder() }));
    this.openSnackBar('Producto agregado', 'Terminar');
  }

  openSnackBar(message: string, action: string) {
    const snackBarRef = this._snackBar.open(message, action, { duration: 60000, panelClass: ['custom-snackbar'] });
    snackBarRef.onAction().subscribe(()=>{
      console.log('clicked');

    });
  }

  increaseQuantity() {
    this.quantityControl.setValue(this.quantityControl.value! + 1);
  }

  decreaseQuantity() {
    if (this.quantityControl.value! > this.product.minPurchase) {
      this.quantityControl.setValue(this.quantityControl.value! - 1);
    }
  }

  private buildOrder(): IOrder {
    return {
      productId: this.product.id,
      productName: this.product.name,
      quantity: this.quantityControl.value!,
      unitPrice: this.product.price,
      totalPrice: this.product.price * this.quantityControl.value!,
    };
  }

}

