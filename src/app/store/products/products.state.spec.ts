import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ProductsState } from './products.state';

describe('Products actions', () => {
  let store: Store;

  beforeEach(() => {
     TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ProductsState])]
    }).compileComponents();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

});
