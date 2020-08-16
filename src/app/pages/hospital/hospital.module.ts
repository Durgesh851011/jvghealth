import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HospitalRoutingModule, routedComponents } from './hospital-routing.module';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalInputComponent } from './hospital-input/hospital-input.component';
import { HospitalService } from './../../_services/hospital.service';
import { LocationService } from './../../_services/location.service';
@NgModule({
  declarations: [
    ...routedComponents,
    HospitalListComponent, HospitalInputComponent
  ],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [HospitalService, LocationService]
})
export class HospitalModule { }
