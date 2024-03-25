import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasOrdersToContinueGuard } from './has-orders-to-continue.guard';

describe('hasOrdersToContinueGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasOrdersToContinueGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
