import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiseaseListComponent } from './disease-list/disease-list.component';

import { DiseaseInputComponent } from './disease-input/disease-input.component';
import { DiseaseComponent } from './disease.component';
const routes: Routes = [{
  path: '',
  component: DiseaseComponent,
  children: [
    {
      path: 'list',
      component: DiseaseListComponent,
    },
    {
      path: 'input',
      component: DiseaseInputComponent,
    },
    {
      path: 'edit/:id',
      component: DiseaseInputComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseRoutingModule { }
export const routedComponents = [
  DiseaseComponent,
  DiseaseListComponent,
  DiseaseInputComponent
];