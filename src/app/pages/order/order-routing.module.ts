import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderLabreporttestListComponent } from './order-labreporttest-list/order-labreporttest-list.component';
import { OrderComponent } from './order.component';

const routes: Routes = [{
  path: '',
  component: OrderComponent,
  children: [
    {
      path: 'medicineorder',
      component: OrderListComponent,
    },
    {
      path: 'labtestorder',
      component: OrderLabreporttestListComponent,
    },
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
export const routedComponents = [
  OrderComponent,
  OrderListComponent,
  OrderLabreporttestListComponent
];
 