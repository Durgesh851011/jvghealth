import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { QuestionService } from "./../../../_services/question.service";
@Component({
  selector: 'ngx-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  constructor(private questionService: QuestionService, private toastr: ToastrService) {
    this.fetchDiseaseData();
  }
  source: LocalDataSource = new LocalDataSource();
  public diseaseList: any = [];
  ngOnInit(): void {
    this.fetchData();
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },

    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    actions: {
      add: true,
      edit: true,
      delete: false,
    },
    columns: {
      question: {
        title: 'Question',
        type: 'string',
      },
      answerYes: {
        title: '(Yes) Answer',
        type: 'string',
      },
      answerNo: {
        title: '(No) Answer',
        type: 'string',
      },
      diseaseId: {
        title: 'Disease',
        width: '12%',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [],
          },
        },

        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [],
          },
        },

        valuePrepareFunction: (value) => {
          var a = this.diseaseList.filter(x => parseInt(x.value) === parseInt(value));
          if (a.length) {
            return a[0].title
          } else {
            return '';
          }
        }
      },
    },
  };
  onCreateConfirm(event) {
    this.questionService.createUpadteQA(event.newData, 'cr').pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.toastr.success(data.msg, 'Success');
          event.confirm.resolve();
          this.fetchData();
        } else {
          event.confirm.reject();
          this.toastr.error(data.msg, 'Success');
        }
      },
      error => {
        event.confirm.reject();
      }
    )
  }

  onSaveConfirm(event) {
    this.questionService.createUpadteQA(event.newData, 'up').pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.toastr.success(data.msg, 'Success');
          event.confirm.resolve();
        } else {
          event.confirm.reject();
          this.toastr.error(data.msg, 'Success');
        }
      },
      error => {
        event.confirm.reject();
      }
    )
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  fetchData() {
    this.questionService.getQuestions().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.source.load(data.Result);
        }
      },
      error => {

      }
    )
  }

  fetchDiseaseData() {
    this.questionService.getDiseaseList().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          data.Result.forEach(element => {
            this.diseaseList.push({ value: element.diseaseId, title: element.name });
          });
          this.settings.columns.diseaseId.editor.config.list = this.diseaseList;
          this.settings.columns.diseaseId.filter.config.list = this.diseaseList;
          this.settings = Object.assign({}, this.settings);
        }
      },
      error => {

      }
    )
  }

}
