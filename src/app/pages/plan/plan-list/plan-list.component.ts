import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { PlanService } from "./../../../_services/plan.service";
@Component({
  selector: 'ngx-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {
  constructor(private planService: PlanService, private toastr: ToastrService) {
    this.fetchDoctorData();
  }
  source: LocalDataSource = new LocalDataSource();
  public doctorList: any = [];
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
      plan: {
        title: 'Plan',
        type: 'string',
      },
      validity: {
        title: 'Validity',
        type: 'string',
      },
      offer: {
        title: 'Offer',
        type: 'string',
      },
      doctorId: {
        title: 'Doctor',
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
          var a = this.doctorList.filter(x => parseInt(x.value) === parseInt(value));
          if (a.length) {
            return a[0].title
          } else {
            return '';
          }
        }
      },
      planDiscount: {
        title: 'Plan Discount(%)',
        type: 'string',
      },
      amount: {
        title: 'Amount(Rs)',
        type: 'string',
      },
    },
  };
  onCreateConfirm(event) {
    if (event.newData.plan == '' || event.newData.plan == null || event.newData.plan == undefined) {
      this.toastr.error("Please enter plan.", 'Error');
      return false;
    } else if (event.newData.validity == '' || event.newData.validity == null || event.newData.validity == undefined) {
      this.toastr.error("Please enter validity.", 'Error');
      return false;
    } else if (event.newData.offer == '' || event.newData.offer == null || event.newData.offer == undefined) {
      this.toastr.error("Please enter offer.", 'Error');
      return false;
    } else if (event.newData.doctorId == '' || event.newData.doctorId == null || event.newData.doctorId == undefined) {
      this.toastr.error("Please select doctor.", 'Error');
      return false;
    } else if (event.newData.planDiscount == '' || event.newData.planDiscount == null || event.newData.planDiscount == undefined) {
      this.toastr.error("Please enter discount.", 'Error');
      return false;
    } else if (event.newData.amount == '' || event.newData.amount == null || event.newData.amount == undefined) {
      this.toastr.error("Please enter discount.", 'Error');
      return false;
    }
    this.planService.createUpadtePlan(event.newData, 'cr').pipe(first()).subscribe(
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
    if (event.newData.plan == '' || event.newData.plan == null || event.newData.plan == undefined) {
      this.toastr.error("Please enter plan.", 'Error');
      return false;
    } else if (event.newData.validity == '' || event.newData.validity == null || event.newData.validity == undefined) {
      this.toastr.error("Please enter validity.", 'Error');
      return false;
    } else if (event.newData.offer == '' || event.newData.offer == null || event.newData.offer == undefined) {
      this.toastr.error("Please enter offer.", 'Error');
      return false;
    } else if (event.newData.doctorId == '' || event.newData.doctorId == null || event.newData.doctorId == undefined) {
      this.toastr.error("Please select doctor.", 'Error');
      return false;
    } else if (event.newData.planDiscount == '' || event.newData.planDiscount == null || event.newData.planDiscount == undefined) {
      this.toastr.error("Please enter discount.", 'Error');
      return false;
    } else if (event.newData.amount == '' || event.newData.amount == null || event.newData.amount == undefined) {
      this.toastr.error("Please enter discount.", 'Error');
      return false;
    }
    this.planService.createUpadtePlan(event.newData, 'up').pipe(first()).subscribe(
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
    this.planService.getPlan().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.source.load(data.Result);
        }
      },
      error => {

      }
    )
  }

  fetchDoctorData() {
    this.planService.getDoctorList().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          data.Result.forEach(element => {
            this.doctorList.push({ value: element.doctorId, title: element.name });
          });
          this.settings.columns.doctorId.editor.config.list = this.doctorList;
          this.settings.columns.doctorId.filter.config.list = this.doctorList;
          this.settings = Object.assign({}, this.settings);
        }
      },
      error => {

      }
    )
  }

}
