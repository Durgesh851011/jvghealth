import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DoctorsService } from "../../../_services/doctors.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'ngx-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent {
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
      phone: {
        title: 'Phone',
        type: 'string',
      },
      city: {
        title: 'City',
        type: 'string',
      },
      availability: {
        title: 'Availability',
        type: 'string',
      },
      hospital: {
        title: 'Hospital',
        type: 'string',
      },
      experience: {
        title: 'Experiance',
        type: 'string',
      },
      doctorCost: {
        title: 'Fee(Rs)',
        type: 'string',
      },
      active_flag: {
        title: 'Status',
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
  constructor(private spinner: NgxSpinnerService,private doctorsService: DoctorsService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.doctorsService.getData().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == 'true') {
          this.source.load(data.Result);
        }
        this.spinner.hide();
      },
      error => {
        if (error.status === 403) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.toastr.error('Somethings gone wrong. Please try after sometimes.', 'Error');
        }
        this.spinner.hide();
      }
    )
  }

  onCustomAction(event) {
    this.router.navigate(['pages/doctor/edit/' + event.data.doctorId]);
  }

}
