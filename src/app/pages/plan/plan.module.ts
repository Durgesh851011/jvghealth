import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PlanRoutingModule, routedComponents } from './plan-routing.module';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanService } from "./../../_services/plan.service";

@NgModule({
  declarations: [...routedComponents, PlanListComponent],
  imports: [
    CommonModule,
    PlanRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers:[PlanService]
})
export class PlanModule { }
