import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SubDiseaseRoutingModule, routedComponents } from './sub-disease-routing.module';
import { SubDiseaseListComponent } from './sub-disease-list/sub-disease-list.component';
import { SubDiseaseInputComponent } from './sub-disease-input/sub-disease-input.component';
import { SubDiseaseService } from './../../_services/sub-disease.service';


@NgModule({
  declarations: [...routedComponents, SubDiseaseListComponent, SubDiseaseInputComponent],
  imports: [
    CommonModule,
    SubDiseaseRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [SubDiseaseService], 
})
export class SubDiseaseModule { }
