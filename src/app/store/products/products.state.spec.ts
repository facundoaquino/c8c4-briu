import { TestBed, waitForAsync } from '@angular/core/testing';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { ProductsState } from './products.state';
import { Observable } from 'rxjs';

describe('Products actions', () => {
  let store: Store;
  let actions$: Observable<any>;

  beforeEach( () => {
     TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ProductsState])]
    }).compileComponents();
    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions)
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

});
