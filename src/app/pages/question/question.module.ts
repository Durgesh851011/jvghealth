import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { QuestionRoutingModule, routedComponents } from './question-routing.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionService } from "./../../_services/question.service";

@NgModule({
  declarations: [...routedComponents,QuestionListComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers:[QuestionService]
})
export class QuestionModule { }
