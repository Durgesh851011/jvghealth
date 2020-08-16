import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LabReportListComponent } from './lab-report-list/lab-report-list.component';
import { LabReportComponent } from './lab-report.component';
const routes: Routes = [{
  path: '',
  component: LabReportComponent,
  children: [
    {
      path: 'list',
      component: LabReportListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabReportRoutingModule { }
export const routedComponents = [
  LabReportComponent,
  LabReportListComponent,
];
