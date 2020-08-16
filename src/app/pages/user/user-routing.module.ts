import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [
    {
      path: 'list',
      component: UserListComponent,
    },
    // {
    //   path: 'input',
    //   component: UserAddComponent,
    // },
    // {
    //   path: 'edit/:id',
    //   component: UserAddComponent
    // }
  ],
}];


// ng g m secondary-module –-routing
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }


export const routedComponents = [
  UserComponent,
  UserListComponent,
  UserAddComponent,
];





