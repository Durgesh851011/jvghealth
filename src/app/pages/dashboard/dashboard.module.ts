import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from "../../_services/dashboard.service";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }

