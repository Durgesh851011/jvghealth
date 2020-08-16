import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { LocationService } from '../../../_services/location.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  constructor(private locationService: LocationService, private toastr: ToastrService) {
    this.fetchData();
  }
  source: LocalDataSource = new LocalDataSource();
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
      delete:false,
    },
    columns: {
      name: {
        title: 'Country',
        type: 'string',
      },
    },
  };
  onCreateConfirm(event) {
    if (event.newData.name == '' || event.newData.name == null || event.newData.name == undefined) {
      this.toastr.error("Please enter country name.", 'Error');
      return false;
    }
    this.locationService.createUpadteCountry(event.newData, 'cr').pipe(first()).subscribe(
      (data: any) => {
        console.log("country=>>>", data);
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
      this.toastr.error("Please enter country name.", 'Error');
      return false;
    }
    this.locationService.createUpadteCountry(event.newData, 'up').pipe(first()).subscribe(
      (data: any) => {
        console.log("country=>>>", data);
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
    this.locationService.getCountryList().pipe(first()).subscribe(
      (data: any) => {
        console.log("country=>>>", data);
        if (data.success == true) {
          this.source.load(data.Result);
        }
      },
      error => {

      }
    )
  }

}
