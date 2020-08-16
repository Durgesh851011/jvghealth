import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { LabReportService } from './../../../_services/lab-report.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
@Component({
  selector: 'ngx-lab-report-list',
  templateUrl: './lab-report-list.component.html',
  styleUrls: ['./lab-report-list.component.scss']
})
export class LabReportListComponent implements OnInit {
  constructor(private labReportService: LabReportService, private toastr: ToastrService) {
    this.fetchData();
  }
  source: LocalDataSource = new LocalDataSource();
  public cityList: any = [];
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
      report: {
        title: 'Report Name',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      discount: {
        title: 'Discount(%)',
        type: 'string',
      },
      
    },
  };

  onCreateConfirm(event) {
    if(event.newData.report=='' || event.newData.report==null || event.newData.report==undefined){
      this.toastr.error("Please enter report name.", 'Error');
      return false;
    }else if(event.newData.price=='' || event.newData.price==null || event.newData.price==undefined){
      this.toastr.error("Please enter price.", 'Error');
      return false;
    }else if(event.newData.discount=='' || event.newData.discount==null || event.newData.discount==undefined){
      this.toastr.error("Please enter discount.", 'Error');
      return false;
    }
    this.labReportService.createUpadte(event.newData, 'cr').pipe(first()).subscribe(
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
    if(event.newData.report=='' || event.newData.report==null || event.newData.report==undefined){
      this.toastr.error("Please enter report name.", 'Error');
      return false;
    }else if(event.newData.price=='' || event.newData.price==null || event.newData.price==undefined){
      this.toastr.error("Please enter price.", 'Error');
      return false;
    }else if(event.newData.discount=='' || event.newData.discount==null || event.newData.discount==undefined){
      this.toastr.error("Please enter discount.", 'Error');
      return false;
    }
    this.labReportService.createUpadte(event.newData, 'up').pipe(first()).subscribe(
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

  fetchData() {
    this.labReportService.getLabReport().pipe(first()).subscribe(
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
