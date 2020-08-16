import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionComponent } from './question.component';
const routes: Routes = [{
  path: '',
  component: QuestionComponent,
  children: [
    {
      path: 'list',
      component: QuestionListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
export const routedComponents = [
  QuestionComponent,
  QuestionListComponent
];