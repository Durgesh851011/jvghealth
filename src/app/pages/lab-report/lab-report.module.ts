import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LabReportRoutingModule, routedComponents } from './lab-report-routing.module';
import { LabReportListComponent } from './lab-report-list/lab-report-list.component';
import { LabReportService } from './../../_services/lab-report.service';

@NgModule({
  declarations: [...routedComponents, LabReportListComponent],
  imports: [
    CommonModule,
    LabReportRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [LabReportService]
})
export class LabReportModule { }
