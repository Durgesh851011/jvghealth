import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MedicineService } from "../../../_services/medicine.service";

@Component({
  selector: 'ngx-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {
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
      price: {
        title: 'Price',
        type: 'string',
      },
      discount: {
        title: 'Discount',
        type: 'string',
      },
      prescription: {
        title: 'Prescription',
        type: 'string',
      },
      medicine_type: {
        title: 'Medicine Type',
        type: 'string',
      }
    },
  };
  ngOnInit(): void {
  }
  source: LocalDataSource = new LocalDataSource();
  constructor(private medicineService: MedicineService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.fetchData();
  }

  fetchData() {
    this.medicineService.getData().pipe(first()).subscribe(
      (data: any) => {
        if(data.success==true){
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
    this.router.navigate(['pages/medicine/edit/' + event.data.medicineId]);
  }
}