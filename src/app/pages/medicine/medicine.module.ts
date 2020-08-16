import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MedicineRoutingModule, routedComponents } from './medicine-routing.module';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineInputComponent } from './medicine-input/medicine-input.component';
import { MedicineService } from "../../_services/medicine.service";
@NgModule({
  declarations: [
    ...routedComponents,
    MedicineListComponent, MedicineInputComponent],
  imports: [
    CommonModule, MedicineRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [MedicineService]
})
export class MedicineModule { }
