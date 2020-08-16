import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { PaymentService } from "./../../../_services/payment.service";
@Component({
  selector: 'ngx-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  constructor(private paymentService: PaymentService, private toastr: ToastrService) {
    
  }
  source: LocalDataSource = new LocalDataSource();
  public doctorList: any = [];
  ngOnInit(): void {
    this.fetchData();
  }

  settings = {
    
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      orderId: {
        title: 'Order Id',
        type: 'string',
      },
      orderType: {
        title: 'Order From',
        type: 'string',
      },
      paymentMode: {
        title: 'Payment Mode',
        type: 'string',
      },
      totalAmount: {
        title: 'Amount(Rs)',
        type: 'string',
      },
      createtime: {
        title: 'Payment Date',
        type: 'string',
      },
      transactionId: {
        title: 'Transactionid',
        type: 'string',
      },
    },
  };

  fetchData() {
    this.paymentService.getPayment('order').pipe(first()).subscribe(
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
