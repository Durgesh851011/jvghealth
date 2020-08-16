import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PaymentService } from "./../../_services/payment.service";
import { PaymentRoutingModule, routedComponents } from './payment-routing.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { AppointmentPaymentListComponent } from './appointment-payment-list/appointment-payment-list.component';

@NgModule({
  declarations: [...routedComponents, PaymentListComponent, AppointmentPaymentListComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers:[PaymentService]
})
export class PaymentModule { }
