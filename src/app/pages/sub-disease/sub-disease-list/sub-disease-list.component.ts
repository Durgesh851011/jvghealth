import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SubDiseaseService } from './../../../_services/sub-disease.service';
@Component({
  selector: 'ngx-sub-disease-list',
  templateUrl: './sub-disease-list.component.html',
  styleUrls: ['./sub-disease-list.component.scss']
})
export class SubDiseaseListComponent implements OnInit {

  constructor(private subDiseaseService: SubDiseaseService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.fetchDiseaseData();
  }

  settings = {
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'ourCustomAction', title: '<i class="nb-edit"></i>' }
      ],
    },
    columns: {
      name: {
        title: 'Name',
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

  source: LocalDataSource = new LocalDataSource();
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.subDiseaseService.getData().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.source.load(data.Result);
        }
      },
      error => {

      }
    )
  }

  onCustomAction(event) {
    this.router.navigate(['pages/subdisease/edit/' + event.data.subDiseaseId]);
  }

  diseaseList: any = [];
  fetchDiseaseData() {
    this.subDiseaseService.getDisease().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.diseaseList = [];
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
