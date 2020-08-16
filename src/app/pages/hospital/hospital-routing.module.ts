import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalComponent } from './hospital.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalInputComponent } from './hospital-input/hospital-input.component';
const routes: Routes = [{
  path: '',
  component: HospitalComponent,
  children: [
    {
      path: 'list',
      component: HospitalListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule { }

export const routedComponents = [
  HospitalComponent,
  HospitalListComponent,
  HospitalInputComponent,
];
