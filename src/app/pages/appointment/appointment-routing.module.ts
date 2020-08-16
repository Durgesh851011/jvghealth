import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';

const routes: Routes = [{
  path: '',
  component: AppointmentComponent,
  children: [
    {
      path: 'list',
      component: AppointmentListComponent,
    },
    // {
    //   path: 'edit/:id',
    //   component: DoctorInputComponent
    // }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
export const routedComponents = [
  AppointmentComponent,
  AppointmentListComponent,
];
