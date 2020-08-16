import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationStart, Router } from "@angular/router";
const API_URL = 'http://jvghealth.com/webservices/';
@Injectable()
export class DoctorsService {
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
    return this.http.post(API_URL + 'adGetDoctorList.php', {}, { headers: this.headers });
  }

  GetCityHospitalSpecialityLists() {
    return this.http.post(API_URL + 'adGetCityHospitalSpecialityLists.php', {}, { headers: this.headers });
  }

  findsingleData(doctorId) {
    return this.http.post(API_URL + 'adGetSingleDoctorDetail.php', { doctorId: doctorId }, { headers: this.headers });
  }


  saveData(data, id) {
    this.headers = new HttpHeaders({
      'Authorization': sessionStorage.getItem('tokenadmin'),
      'Accept': 'multipart/form-data'
    });

    if (id > 0) {
      return this.http.post(API_URL + 'ad_update_doctor.php' , data, { headers: this.headers });
    } else {
      return this.http.post(API_URL + 'ad_create_doctor.php', data, { headers: this.headers });
    }
  }

}
