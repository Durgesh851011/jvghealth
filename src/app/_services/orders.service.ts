import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationStart, Router } from "@angular/router";
const API_URL = 'http://jvghealth.com/webservices/';

@Injectable()
export class OrdersService {
  headers;
  constructor(private http: HttpClient, private route: Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {

        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('tokenadmin')
        });
      }
    });

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('tokenadmin')
    });
  }

  getOrderList() {
    return this.http.post(API_URL + 'adOrderList.php', { type: "M" }, { headers: this.headers });
  }

  getLabTestOrderList() {
    return this.http.post(API_URL + 'adOrderList.php', { type: "T" }, { headers: this.headers });
  }

  getOrderDetail(orderId) {
    return this.http.post(API_URL + 'adOrderItemsByOrderId.php', { orderId: orderId, type: "medicine" }, { headers: this.headers });
  }
  updateOder(data) {
    var jsonInput = JSON.stringify(data, function (key, value) { return value === null ? "" : value });
    return this.http.put(API_URL + 'adUpdateMedicianOrder.php', jsonInput, { headers: this.headers });
  }

}
