import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialityComponent } from './speciality.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
const routes: Routes = [{
  path: '',
  component: SpecialityComponent,
  children: [
    {
      path: 'list',
      component: SpecialityListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialityRoutingModule { }


export const routedComponents = [
  SpecialityComponent,
  SpecialityListComponent
];





