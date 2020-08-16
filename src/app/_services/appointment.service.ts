import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationStart, Router } from "@angular/router";
const API_URL = 'http://jvghealth.com/webservices/';

@Injectable()
export class AppointmentService {
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

  getData() {
    return this.http.post(API_URL + 'adGetAppointmentList.php', {}, { headers: this.headers });
  }

  findsingleData(appointmentId) {
    return this.http.post(API_URL + 'adGetAppointmentSingle.php', { appointmentId: appointmentId }, { headers: this.headers });
  }

  saveData(data) {
      return this.http.put(API_URL + 'adUpdateAppointment.php', data, { headers: this.headers });
  }

}
