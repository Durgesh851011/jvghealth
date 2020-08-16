import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { OrdersService } from "./../../../_services/orders.service";
import * as $ from 'jquery';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'ngx-order-labreporttest-list',
  templateUrl: './order-labreporttest-list.component.html',
  styleUrls: ['./order-labreporttest-list.component.scss']
})
export class OrderLabreporttestListComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,private ordersService: OrdersService, private toastr: ToastrService) {

  }
  source: LocalDataSource = new LocalDataSource();
  ngOnInit(): void {
    this.fetchData();
  }


  // ::ng-deep ng2-smart-table thead > tr > th  {
  //     background-color:blue;
  // }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'ourCustomAction', title: '<i class="nb-edit"></i>' }
      ],
    },
    columns: {
      orderId: {
        title: 'Order Id',
        type: 'string',
      },
      name: {
        title: 'User Name',
        type: 'string',
      },
      totalAmount: {
        title: 'Total Amount',
        type: 'string',
      },
      orderStatus: {
        title: 'Order Status',
        type: 'string',
      },
      createtime: {
        title: 'Order Date',
        type: 'string',
      },
    },
  };

  fetchData() {
    this.spinner.show();
    this.ordersService.getLabTestOrderList().pipe(first()).subscribe(
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

  public singleOrderItemDetail: any = [];
  public singleOrderDetail: any;
  public orderDetailPopupShowHide: boolean = false;
  public orderStatusArr: any = ['Cancel', 'Pending', 'Done'];

  onChange(val) {
    this.spinner.show();
    var data = { orderId: this.singleOrderDetail.orderId, orderStatus: val }
    this.ordersService.updateOder(data).pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.orderDetailPopupShowHide = false;
          this.fetchData();
          this.closeNav();
          this.toastr.success(data.msg, 'Success');
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      }
    )
    console.log(event);
  }
  getOrderDetail(orderId) {
    this.spinner.show();
    this.ordersService.getOrderDetail(orderId).pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.orderDetailPopupShowHide = true;
          this.singleOrderItemDetail = data.Result;
          $('#fullPagePopup').width('100%');
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      }
    )
  }

  onCustomAction(event) {
    this.singleOrderDetail = event.data;
    this.getOrderDetail(event.data.orderId);
  }

  closeNav() {
    this.orderDetailPopupShowHide = false;
    $('#fullPagePopup').width('0%');
    this.singleOrderItemDetail = [];
  }

}
