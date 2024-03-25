import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { OrderComponent } from './order/new/order/order.component';
import { OrderFormComponent } from './order/new/order-form/order-form.component';
import { hasOrdersToContinueGuard } from './guards/has-orders-to-continue.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'new-order',
    component: OrderComponent
  },
  {
    path: 'order-form',
    component: OrderFormComponent,
    canActivate: [hasOrdersToContinueGuard]
  }
];
