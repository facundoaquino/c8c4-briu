import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { IStore } from '../../../models';
import { IOrder } from '../../../models/product';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, OrderComponent],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
  public orders: IOrder[] = [];
  public form: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.min(100000), Validators.max(9999999999), Validators.pattern('^[0-9]*$'),]],
      province: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.minLength(4)]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      number: ['', [Validators.required, Validators.minLength(1)]],
      floor: ['', Validators.maxLength(3)],
      department: ['', Validators.maxLength(3)]
    });
  }

  ngOnInit(): void {
    this.store.selectSnapshot((state: IStore) => {
      this.orders = state.products.order;
    }
    );

  }

  onFileChange(_event: Event) {
    // do nothing for now...
  }

  onBack() {
    this.router.navigateByUrl('/new-order');
  }

  nextStep() {

  }

  sendMessage() {
    const message =encodeURIComponent(this.buildMessage()).replaceAll('space', '%0A');
    window.open(`https://api.whatsapp.com/send/?phone=%2B5491165155683&text=${message}&type=phone_number&app_absent=0`);
  }

  buildMessage() {
    let text = '';
    const orders = this.store.selectSnapshot((state: IStore)=>
    state.products.order);
    orders.forEach((order, index) => {
      text = `${text } ➡ ${order.productName}`;
      text = `${text } space`;
      text = `${text } Unidades: ${order.quantity}`;
      text = `${text } space`;
      text = `${text } Total: 💲 ${order.totalPrice}`;
      text = `${text } space`;
      if (!((index+1) === orders.length)) {
        text = `${text } ----------------- `;
      }
      text = `${text } space`;
    });
    if (orders.length) {
      text = `${text } ----------------- `;
      text = `${text } space`;

      text = `${text } Total: 💰 ${this.totalAmount }`;
    }
    return text;
  }

  get totalAmount() {
    return this.orders.reduce((ord1, ord2: IOrder) =>{
      return ord1 + ord2.totalPrice;}, 0);
  }
}
