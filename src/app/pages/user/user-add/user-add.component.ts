import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../_services/auth.service";
import {ToastrService} from "ngx-toastr";
import {first} from "rxjs/operators";


@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  domainForm: FormGroup;
  submitted = false;
  loader = false;
  listOfTables;
  userId;
  authAssociation;
  from_date
  listAdvertiserName = [];
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
  

  constructor(private formBuilder: FormBuilder,
    private service: UserService,
    private auth : AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService
    ) { 
      if(this.route.snapshot.params && typeof this.route.snapshot.params.id!== 'undefined'){
        this.userId=this.route.snapshot.params.id;
      }
    }

  ngOnInit(): void {
    this.domainForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      mobile_number: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      
    });
    
    this.getUserInfo();
  }


  async getUserInfo() {
    if (this.userId == 0) {
      this.loader = false;
      this.toastr.error('Affiliates Detail not found.', 'Error');
      this.router.navigate(['/pages/domain/lists'], { replaceUrl: true });
    } else if (this.userId) {
      this.loader = true;
      var data={
        "id": this.userId
      }
      this.service.findsingleuser(data).pipe(first())
        .subscribe(dataSource => {
          console.log("dataSource === ",dataSource)
          this.authAssociation = dataSource['Data']['id']
          let data = dataSource['Data']['user'];
          console.log("dataSource ===",data)
          
          this.loader = false;
          this.domainForm.get('firstname').setValue(data['firstname']);
          this.domainForm.get('lastname').setValue(data['lastname']);
          this.domainForm.get('mobile_number').setValue(data['mobile_number']);
          this.domainForm.get('email').setValue(data['email']);
          this.domainForm.get('password').setValue('');
        },
          error => {
            this.loader = false;
            if (error.status == 400 || error.status == 500 || error.status == 403) {
              this.toastr.error(error.error.message, 'Error');
            } else if (error.status == 401) {
              // this.auth.logout();
              this.router.navigate(['/auth/login'], { replaceUrl: true });
            } else {
              this.toastr.error(error.error.message, 'Error');
              this.router.navigate(['/pages/domain/lists'], { replaceUrl: true });
            }

          });
    }
  }

  get f() { return this.domainForm.controls; }
  onSubmit() {
    
    if (this.domainForm.invalid) {
      return false;
    }

    this.domainForm.value.roleId =  "bd0332db-d69d-4c5c-81e4-b54a436ad9a1";
    if(this.authAssociation){
      this.domainForm.value.authAssociation = this.authAssociation
    }
    this.service.saveData(this.domainForm.value, this.userId).subscribe(
      data => {
        this.loader = false;
        if(!this.userId){
          this.toastr.success('User has been created successfully', 'Success');
        }else{
          this.toastr.success('User has been updated successfully', 'Success');
        }
        this.router.navigate(['/pages/user/lists'], { replaceUrl: true });

      }, error => {
        this.loader = false;
        if (error.status == 400 || error.status == 500 || error.status == 403) {
          this.toastr.error(error.error.message, 'Error');
          
        } else if (error.status == 401) {
          // this.auth.logout();
          // this.router.navigateByUrl('/auth/login');
        } else {
          this.toastr.error('Somethings gone wrong. Please try again.', 'Error');
        }
      });
  }

}
