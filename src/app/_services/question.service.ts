import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationStart, Router } from "@angular/router";
const API_URL = 'http://jvghealth.com/webservices/';

@Injectable()
export class QuestionService {
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

  getQuestions() {
    return this.http.post(API_URL + 'adGetQAlist.php', {}, { headers: this.headers });
  }
  
  getDiseaseList() {
    return this.http.post(API_URL + 'adGetDiseaseList.php', {}, { headers: this.headers });
  }
 
  createUpadteQA(data, type) {
    data.type = type;
    var jsonInput = JSON.stringify(data, function (key, value) { return value === null ? "" : value });
    return this.http.put(API_URL + 'adCreateUpdateQA.php', jsonInput, { headers: this.headers });
  }

}
