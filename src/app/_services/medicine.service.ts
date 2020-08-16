import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationStart, Router } from "@angular/router";
const API_URL = 'http://jvghealth.com/webservices/';

@Injectable()
export class MedicineService {
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
    return this.http.post(API_URL + 'adGetMedicineList.php', {}, { headers: this.headers });
  }

  findsingleData(medicineId) {
    return this.http.post(API_URL + 'adGetSingleMedicine.php', { medicineId: medicineId }, { headers: this.headers });
  }

  saveData(data, id) {
    this.headers = new HttpHeaders({
      'Authorization': sessionStorage.getItem('tokenadmin'),
      'Accept': 'multipart/form-data'
    });

    if (id) {
      return this.http.post(API_URL + 'adUpdateMedicine.php', data, { headers: this.headers });
    } else {
      return this.http.post(API_URL + 'adCreateMedicine.php', data, { headers: this.headers });
    }
  }

}
