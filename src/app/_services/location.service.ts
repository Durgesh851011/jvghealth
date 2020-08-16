import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationStart, Router } from "@angular/router";
const API_URL = 'http://jvghealth.com/webservices/';

@Injectable()
export class LocationService {
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

  getCountryList() {
    return this.http.post(API_URL + 'adGetCountryList.php', {}, { headers: this.headers });
  }
  getCityList() {
    return this.http.post(API_URL + 'adGetCityList.php', {}, { headers: this.headers });
  }
  getStateList() {
    return this.http.post(API_URL + 'adGetStateList.php', {}, { headers: this.headers });
  }
  getCountryStateCityList() {
    return this.http.post(API_URL + 'adGetCountryStateCity.php', {}, { headers: this.headers });
  }

  createUpadteCountry(data, type) {
    data.type = type;
    var jsonInput = JSON.stringify(data, function (key, value) { return value === null ? "" : value });
    return this.http.put(API_URL + 'adCreateUpdateCountry.php', jsonInput, { headers: this.headers });
  }
  createUpadteState(data, type) {
    data.type = type;
    var jsonInput = JSON.stringify(data, function (key, value) { return value === null ? "" : value });
    return this.http.put(API_URL + 'adCreateUpdateState.php', jsonInput, { headers: this.headers });
  }
  createUpadteCity(data, type) {
    data.type = type;
    var jsonInput = JSON.stringify(data, function (key, value) { return value === null ? "" : value });
    return this.http.put(API_URL + 'adCreateUpdateCity.php', jsonInput, { headers: this.headers });
  }

}
