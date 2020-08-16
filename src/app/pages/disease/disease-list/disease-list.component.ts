import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Disease1Service } from './../../../_services/disease1.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'ngx-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss']
})
export class DiseaseListComponent implements OnInit {

  constructor( private spinner: NgxSpinnerService,private diseaseService: Disease1Service, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.fetchSpecialityData();
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
      specialityId: {
        title: 'Speciality',
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
          var a = this.specialityList.filter(x => parseInt(x.value) === parseInt(value));
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
    this.spinner.show();
    this.diseaseService.getData().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.source.load(data.Result);
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      }
    )
  }

  onCustomAction(event) {
    this.router.navigate(['pages/disease/edit/' + event.data.diseaseId]);
  }

  specialityList: any = [];
  fetchSpecialityData() {
    this.spinner.show();
    this.diseaseService.getSpeciality().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.specialityList = [];
          data.Result.forEach(element => {
            this.specialityList.push({ value: element.specialityId, title: element.name });
          });
          this.settings.columns.specialityId.editor.config.list = this.specialityList;
          this.settings.columns.specialityId.filter.config.list = this.specialityList;
          this.settings = Object.assign({}, this.settings);
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      }
    )
  }

}
