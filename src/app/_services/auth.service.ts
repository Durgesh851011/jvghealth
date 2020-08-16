import { Injectable, OnInit, NgZone } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router'
const API_URL = 'http://jvghealth.com/webservices/';

@Injectable()
export class AuthService {
  loading = false;
  isLogout = false;
  headersOpen;
  hedr;
  constructor(private http: HttpClient, private route: Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.headersOpen = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('tokenadmin')
        });
      }
    });

    this.headersOpen = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('tokenadmin')
    });
  }

  async isAuthenticateverify() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', 'Bearer ' + sessionStorage.getItem('tokenadmin'));
    var retdata = false;
    try {
      return await this.http.post(API_URL + 'admin/verify', {}, { headers }).toPromise();
    } catch (err) {
      return false;
    }
  }

  login(valueData) {
    valueData = JSON.stringify(valueData, function (key, value) { return value === null ? "" : value });
    return this.http.post(API_URL + 'adlogin.php', valueData)
      .pipe(map(res => {
        var data : any = res;
        if (data && data.success=='true') {
          sessionStorage.setItem('userDetail', data.user_details);
          sessionStorage.setItem('tokenadmin', data.token);
        }
        return data;
      }));
  }
}
