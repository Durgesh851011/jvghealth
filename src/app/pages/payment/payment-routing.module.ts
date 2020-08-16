import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { AppointmentPaymentListComponent } from './appointment-payment-list/appointment-payment-list.component';

const routes: Routes = [{
  path: '',
  component: PaymentComponent,
  children: [
    {
      path: 'order',
      component: PaymentListComponent,
    },
    {
      path: 'appointment',
      component: AppointmentPaymentListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
export const routedComponents = [
  PaymentComponent,
  PaymentListComponent,
  AppointmentPaymentListComponent
];