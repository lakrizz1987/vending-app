import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingMachine } from './vending-machine.component';

describe('VendingMachine', () => {
  let component: VendingMachine;
  let fixture: ComponentFixture<VendingMachine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendingMachine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendingMachine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
