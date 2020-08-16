import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { LocationService } from '../../../_services/location.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
@Component({
  selector: 'ngx-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  constructor(private locationService: LocationService, private toastr: ToastrService) {
    this.fetchData();
  }
  source: LocalDataSource = new LocalDataSource();
  public stateList: any = [];
  public countryList: any = [];
  ngOnInit(): void {

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
      name: {
        title: 'City',
        type: 'string',
      },
      stateId: {
        title: 'State',
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
          var a = this.stateList.filter(x => parseInt(x.value) === parseInt(value));
          if (a.length) {
            return a[0].title
          } else {
            return '';
          }
        }
      },

      countryId: {
        title: 'Country',
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
          var a = this.countryList.filter(x => parseInt(x.value) === parseInt(value));
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
    if (event.newData.name == '' || event.newData.name == null || event.newData.name == undefined) {
      this.toastr.error("Please enter city name.", 'Error');
      return false;
    } else if (event.newData.stateId == '' || event.newData.stateId == null || event.newData.stateId == undefined) {
      this.toastr.error("Please select state.", 'Error');
      return false;
    } else if (event.newData.countryId == '' || event.newData.countryId == null || event.newData.countryId == undefined) {
      this.toastr.error("Please select country.", 'Error');
      return false;
    }
    this.locationService.createUpadteCity(event.newData, 'cr').pipe(first()).subscribe(
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
    if (event.newData.name == '' || event.newData.name == null || event.newData.name == undefined) {
      this.toastr.error("Please enter city name.", 'Error');
      return false;
    } else if (event.newData.stateId == '' || event.newData.stateId == null || event.newData.stateId == undefined) {
      this.toastr.error("Please select state.", 'Error');
      return false;
    } else if (event.newData.countryId == '' || event.newData.countryId == null || event.newData.countryId == undefined) {
      this.toastr.error("Please select country.", 'Error');
      return false;
    }
    this.locationService.createUpadteCity(event.newData, 'up').pipe(first()).subscribe(
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
    this.locationService.getCountryStateCityList().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.source.load(data.Result.cityList);
          this.stateList = [];
          this.countryList = [];
          data.Result.stateList.forEach(element => {
            this.stateList.push({ value: element.stateId, title: element.name });
          });
          this.settings.columns.stateId.editor.config.list = this.stateList;
          this.settings.columns.stateId.filter.config.list = this.stateList;

          data.Result.countryList.forEach(element => {
            this.countryList.push({ value: element.countryId, title: element.name });
          });
          this.settings.columns.countryId.editor.config.list = this.countryList;
          this.settings.columns.countryId.filter.config.list = this.countryList;
          this.settings = Object.assign({}, this.settings);
        }
      },
      error => {

      }
    )
  }

}
