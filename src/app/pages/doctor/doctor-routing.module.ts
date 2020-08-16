import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorInputComponent } from './doctor-input/doctor-input.component';

const routes: Routes = [{
  path: '',
  component: DoctorComponent,
  children: [
    {
      path: 'list',
      component: DoctorListComponent,
    },
    {
      path: 'input',
      component: DoctorInputComponent,
    },
    {
      path: 'edit/:id',
      component: DoctorInputComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }

export const routedComponents = [
  DoctorComponent,
  DoctorListComponent,
  DoctorInputComponent,
];