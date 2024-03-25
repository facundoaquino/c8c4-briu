import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { IStore } from '../models';

export const hasOrdersToContinueGuard: CanActivateFn = (route, state) => {

  const productsState = inject(Store);
  const router: Router = inject(Router);
  if (productsState.selectSnapshot((products: IStore) => products.products.order.length)) {
    return true;
  }
 return router.createUrlTree(['/']);
};
