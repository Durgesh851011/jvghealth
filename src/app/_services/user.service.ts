import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationStart, Router } from "@angular/router";
const API_URL = 'http://jvghealth.com/webservices/';

@Injectable()
export class UserService {
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

  getData(){
    return this.http.post(API_URL+'adGetUserList.php',{}, {headers:this.headers});
  }
  
  findsingleuser(data){
    return this.http.post(API_URL+'user/store/findsingleuser',data, {headers:this.headers});
  }


  saveData(data, id) {
    if(id>0){
      return this.http.put(API_URL+'user/store/create/'+id,data, {headers:this.headers});
    }else{
      return this.http.post(API_URL+'user/store/create',data, {headers:this.headers});
    }
  }

  updateUser(data){
    return this.http.post(API_URL+'updateUserByAdmin.php',data, {headers:this.headers});
  }

}
