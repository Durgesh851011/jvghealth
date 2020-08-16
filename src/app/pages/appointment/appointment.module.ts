import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppointmentRoutingModule, routedComponents } from './appointment-routing.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentService } from './../../_services/appointment.service';


@NgModule({
  declarations: [...routedComponents, AppointmentListComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [AppointmentService]
})
export class AppointmentModule { }
