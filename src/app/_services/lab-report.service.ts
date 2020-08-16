import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationStart, Router } from "@angular/router";
const API_URL = 'http://jvghealth.com/webservices/';

@Injectable()
export class LabReportService {
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

  getLabReport() {
    return this.http.post(API_URL + 'adGetLabReportTypeList.php', {}, { headers: this.headers });
  }
 
  createUpadte(data, type) {
    data.type = type;
    var jsonInput = JSON.stringify(data, function (key, value) { return value === null ? "" : value });
    return this.http.put(API_URL + 'adCreateUpdateLabReport.php', jsonInput, { headers: this.headers });
  }

}
