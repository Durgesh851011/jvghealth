import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPaymentListComponent } from './appointment-payment-list.component';

describe('AppointmentPaymentListComponent', () => {
  let component: AppointmentPaymentListComponent;
  let fixture: ComponentFixture<AppointmentPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
