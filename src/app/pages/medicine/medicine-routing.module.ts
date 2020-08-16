import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicineComponent } from './medicine.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineInputComponent } from './medicine-input/medicine-input.component';

const routes: Routes = [{
  path: '',
  component: MedicineComponent,
  children: [
    {
      path: 'list',
      component: MedicineListComponent,
    },
    {
      path: 'input',
      component: MedicineInputComponent,
    },
    {
      path: 'edit/:id',
      component: MedicineInputComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }

export const routedComponents = [
  MedicineComponent,
  MedicineListComponent,
  MedicineInputComponent,
];