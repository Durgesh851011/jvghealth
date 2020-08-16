import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { SpecialityService } from "./../../../_services/speciality.service";
@Component({
  selector: 'ngx-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})
export class SpecialityListComponent implements OnInit {
  constructor(private specialityService: SpecialityService, private toastr: ToastrService) {
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

    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Speciality',
        type: 'string',
      },
    },
  };
  onCreateConfirm(event) {
    if(event.newData.name=='' || event.newData.name==null || event.newData.name==undefined){
      this.toastr.error("Please enter Speciality.", 'Error');
      return false;
    }
    this.specialityService.createUpadteSpeciality(event.newData, 'cr').pipe(first()).subscribe(
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
      this.toastr.error("Please enter Speciality.", 'Error');
      return false;
    }
    this.specialityService.createUpadteSpeciality(event.newData, 'up').pipe(first()).subscribe(
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
    this.specialityService.getSpeciality().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.source.load(data.Result);
        }
      },
      error => {

      }
    )
  }



}
