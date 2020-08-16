import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from "./../../_services/dashboard.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  MedicineOrderSettings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      // custom: [
      //   { name: 'MedicineOrderOnCustomAction', title: '<i class="nb-edit"></i>' }
      // ],
    },
    columns: {
      orderId: {
        title: 'Order Id',
        type: 'string',
      },
      username: {
        title: 'User',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      totalAmount: {
        title: 'Total Amount',
        type: 'string',
      },
      status: {
        title: 'status',
        type: 'string',
      },
    },
  };

  AppointmentSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      // custom: [
      //   { name: 'AppointmentOnCustomAction', title: '<i class="nb-edit"></i>' }
      // ],
    },
    columns: {
      patientName: {
        title: 'Patient',
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
      disease: {
        title: 'Disease',
        type: 'string',
      },
      appointmentTime: {
        title: 'Appointment Time',
        type: 'string',
      },
    },
  };
  MedicineOrderSource: LocalDataSource = new LocalDataSource();
  AppointmentSource: LocalDataSource = new LocalDataSource();


  public dashboardTotalCountData: any = { "toalDoctor": 0, "toalUser": 0, "toalHospital": 0, "Appointment": 0 };
  ngOnInit() {

  }
  constructor(private spinner: NgxSpinnerService, private dashboardService: DashboardService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.dashboardService.fetchData().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.dashboardTotalCountData = data.Result;
          this.spinner.hide();
        }
      },
      error => {

      }
    )
  }
}
