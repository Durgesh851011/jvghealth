import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HospitalService } from './../../../_services/hospital.service';
import { LocationService } from './../../../_services/location.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
@Component({
  selector: 'ngx-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss']
})
export class HospitalListComponent implements OnInit {
  constructor(private hospitalService: HospitalService, private locationService: LocationService, private toastr: ToastrService) {
    this.fetchCityData();
  }
  source: LocalDataSource = new LocalDataSource();
  public cityList: any = [];
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
      delete:false,
    },
    columns: {
      name: {
        title: 'Hospital',
        type: 'string',
      },
      cityId: {
        title: 'City',
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
          var a = this.cityList.filter(x => parseInt(x.value) === parseInt(value));
          if (a.length) {
            return a[0].title
          } else {
            return '';
          }
        }
      }
    },
  };

  onCreateConfirm(event) {
    if(event.newData.name=='' || event.newData.name==null || event.newData.name==undefined){
      this.toastr.error("Please enter hospital name.", 'Error');
      return false;
    }else if(event.newData.cityId=='' || event.newData.cityId==null || event.newData.cityId==undefined){
      this.toastr.error("Please select city.", 'Error');
      return false;
    }
    this.hospitalService.createUpadteHospital(event.newData, 'cr').pipe(first()).subscribe(
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
    if(event.newData.name=='' || event.newData.name==null || event.newData.name==undefined){
      this.toastr.error("Please enter hospital name.", 'Error');
      return false;
    }else if(event.newData.cityId=='' || event.newData.cityId==null || event.newData.cityId==undefined){
      this.toastr.error("Please select city.", 'Error');
      return false;
    }
    this.hospitalService.createUpadteHospital(event.newData, 'up').pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.toastr.success(data.msg, 'Success');
          event.confirm.resolve();
        } else {
          event.confirm.reject();
          this.toastr.error(data.msg, 'Error');
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
    this.hospitalService.getHospital().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.source.load(data.Result);
        }
      },
      error => {

      }
    )
  }

  fetchCityData() {
    this.locationService.getCityList().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.cityList = [];
          data.Result.forEach(element => {
            this.cityList.push({ value: element.cityId, title: element.name });
          });
          this.settings.columns.cityId.editor.config.list = this.cityList;
          this.settings.columns.cityId.filter.config.list = this.cityList;
          this.settings = Object.assign({}, this.settings);
        }
      },
      error => {

      }
    )
  }

}
