import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessOrderModalComponent } from './success-order-modal.component';

describe('SuccessOrderModalComponent', () => {
  let component: SuccessOrderModalComponent;
  let fixture: ComponentFixture<SuccessOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessOrderModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
