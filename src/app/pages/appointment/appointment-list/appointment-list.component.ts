import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from "../../../_services/appointment.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'ngx-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  ngOnInit(): void {

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
      patientName: {
        title: 'Patient Name',
        type: 'string',
      },
      patientAge: {
        title: 'Patient Age',
        type: 'string',
      },
      patientGender: {
        title: 'Patient Gender',
        type: 'string',
      },
      userVisited: {
        title: 'Visited',
        type: 'string',
      },
      userCheckup: {
        title: 'Checkup',
        type: 'string',
      },
      appointmentDate: {
        title: 'Appointment Date',
        type: 'string',
      },
      doctor: {
        title: 'Doctor',
        type: 'string',
      },
      disease: {
        title: 'Disease',
        type: 'string',
      },
      subdisease: {
        title: 'Sub Disease',
        type: 'string',
      },
      amount: {
        title: 'Amount',
        type: 'string',
      },
      paymentStatus: {
        title: 'Payment Status',
        type: 'string',
      },
      appointmentType: {
        title: 'Appointment Type',
        type: 'string',
      },
      user: {
        title: 'User',
        type: 'string',
      },
      alternateNumber: {
        title: 'Alternate Phone',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private spinner: NgxSpinnerService, private appointmentService: AppointmentService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.appointmentService.getData().pipe(first()).subscribe(
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
    this.router.navigate(['pages/doctor/edit/' + event.data.appointmentId]);
  }

}
