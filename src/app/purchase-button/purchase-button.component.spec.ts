import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseButton } from './purchase-button.component';

describe('PurchaseButton', () => {
  let component: PurchaseButton;
  let fixture: ComponentFixture<PurchaseButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
