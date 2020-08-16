import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderRoutingModule, routedComponents } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersService } from "./../../_services/orders.service";
import { OrderLabreporttestListComponent } from './order-labreporttest-list/order-labreporttest-list.component';

@NgModule({
  declarations: [...routedComponents, OrderListComponent, OrderLabreporttestListComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [OrdersService]
})
export class OrderModule { }

