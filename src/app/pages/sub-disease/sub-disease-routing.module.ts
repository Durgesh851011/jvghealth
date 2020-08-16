import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubDiseaseComponent } from './sub-disease.component';
import { SubDiseaseListComponent } from './sub-disease-list/sub-disease-list.component';
import { SubDiseaseInputComponent } from './sub-disease-input/sub-disease-input.component';
const routes: Routes = [{
  path: '',
  component: SubDiseaseComponent,
  children: [
    {
      path: 'list',
      component: SubDiseaseListComponent,
    },
    {
      path: 'input',
      component: SubDiseaseInputComponent,
    },
    {
      path: 'edit/:id',
      component: SubDiseaseInputComponent,
    }
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubDiseaseRoutingModule { }
export const routedComponents = [
  SubDiseaseComponent,
  SubDiseaseListComponent,
  SubDiseaseInputComponent
];