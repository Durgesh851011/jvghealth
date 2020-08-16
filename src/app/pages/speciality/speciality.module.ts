import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SpecialityService } from "./../../_services/speciality.service";
import { SpecialityRoutingModule, routedComponents } from './speciality-routing.module';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';

@NgModule({
  declarations: [ ...routedComponents,SpecialityListComponent],
  imports: [
    CommonModule,
    SpecialityRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers:[SpecialityService]
})
export class SpecialityModule { }
