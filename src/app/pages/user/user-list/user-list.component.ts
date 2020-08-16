import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "../../../_services/user.service";
@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  settings = {
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: false,
    // },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    actions: {
      add: false,
      edit: true,
      delete: false,
      // custom: [
      //   { name: 'ourCustomAction', title: '<i class="nb-edit"></i>' }
      // ],
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        editable: false,
      },
      phone: {
        title: 'Phone',
        type: 'string',
        editable: false,
      },
      email: {
        title: 'Email',
        type: 'string',
        editable: false,
      },
      age: {
        title: 'Age',
        type: 'string',
        editable: false,
      },
      blood_group: {
        title: 'Blood group',
        type: 'string',
        editable: false,
      },
      gender: {
        title: 'Gender',
        type: 'string',
        editable: false,
      },
      referral_code: {
        title: 'Referral code',
        type: 'string',
      },
      referral_amount: {
        title: 'Referral amount',
        type: 'string',
      },
      active_flag: {
        title: 'Status',
        editable: false,
        width: '12%',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: '', title: 'Select' },
              { value: "1", title: 'ACTIVE' },
              { value: "0", title: 'INACTIVE' }
            ],
          },
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: "1", title: 'ACTIVE' },
              { value: "0", title: 'INACTIVE' }
            ],
          },
        },

        valuePrepareFunction: (value) => {
          if (value === "1")
            return 'ACTIVE';
          else if (value === "0")
            return 'INACTIVE';
        }
      }

    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.fetchData();
  }

  fetchData() {
    this.userService.getData().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == 'true') {
          this.source.load(data.Result);
        }
      },
      error => {
        if (error.status === 403) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.toastr.error('Somethings gone wrong. Please try after sometimes.', 'Error');
        }
      }
    )
  }

  onCustomAction(event) {
    // this.router.navigate(['pages/user/edit/' + event.data.id]);
  }



  onSaveConfirm(event) {
    var jsonInput = {
      "referral_amount": event.newData.referral_amount,
      "referral_code": event.newData.referral_code,
      "userId": event.newData.userId,
    }
    this.userService.updateUser(jsonInput).pipe(first()).subscribe(
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

}
