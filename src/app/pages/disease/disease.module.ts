import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DiseaseRoutingModule, routedComponents } from './disease-routing.module';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { Disease1Service } from './../../_services/disease1.service';
import { DiseaseInputComponent } from './disease-input/disease-input.component';
@NgModule({
  declarations: [...routedComponents, DiseaseListComponent, DiseaseInputComponent],
  imports: [
    CommonModule,
    DiseaseRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [Disease1Service],
 
})
export class DiseaseModule { }
