import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'appointment',
      loadChildren: () => import('./appointment/appointment.module')
        .then(m => m.AppointmentModule),
    },
    {
      path: 'labreport',
      loadChildren: () => import('./lab-report/lab-report.module')
        .then(m => m.LabReportModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule),
    },
    {
      path: 'payment',
      loadChildren: () => import('./payment/payment.module')
        .then(m => m.PaymentModule),
    },
    {
      path: 'order',
      loadChildren: () => import('./order/order.module')
        .then(m => m.OrderModule),
    },
    {
      path: 'doctor',
      loadChildren: () => import('./doctor/doctor.module')
        .then(m => m.DoctorModule),
    },
    {
      path: 'medicine',
      loadChildren: () => import('./medicine/medicine.module')
        .then(m => m.MedicineModule),
    },
    {
      path: 'location',
      loadChildren: () => import('./location/location.module')
        .then(m => m.LocationModule),
    },
    {
      path: 'hospital',
      loadChildren: () => import('./hospital/hospital.module')
        .then(m => m.HospitalModule),
    },
    {
      path: 'speciality',
      loadChildren: () => import('./speciality/speciality.module')
        .then(m => m.SpecialityModule),
    },
    {
      path: 'plan',
      loadChildren: () => import('./plan/plan.module')
        .then(m => m.PlanModule),
    },
    {
      path: 'question',
      loadChildren: () => import('./question/question.module')
        .then(m => m.QuestionModule),
    },
    {
      path: 'disease',
      loadChildren: () => import('./disease/disease.module')
        .then(m => m.DiseaseModule),
    },
    {
      path: 'subdisease',
      loadChildren: () => import('./sub-disease/sub-disease.module')
        .then(m => m.SubDiseaseModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
