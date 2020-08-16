import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DoctorRoutingModule, routedComponents } from './doctor-routing.module';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorInputComponent } from './doctor-input/doctor-input.component';
import { DoctorsService } from "../../_services/doctors.service";

@NgModule({
  declarations: [
    ...routedComponents,
    DoctorListComponent, DoctorInputComponent],
  imports: [
    CommonModule, DoctorRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [DoctorsService]
})
export class DoctorModule { }
