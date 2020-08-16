import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserService } from "../../_services/user.service";
@NgModule({
  declarations: [
    ...routedComponents,
    UserListComponent, UserAddComponent],
  imports: [
    CommonModule,
    ThemeModule,
    UserRoutingModule,
    Ng2SmartTableModule
  ],
  providers: [UserService],

})
export class UserModule { }
