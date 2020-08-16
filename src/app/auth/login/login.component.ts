import { Component } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { Router, ActivatedRoute } from '@angular/router'
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../_services/auth.service'
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
  user;
  loader = false;
  errmsg = ''
  constructor(private spinner: NgxSpinnerService, service: NbAuthService, public auth: AuthService, router: Router, cd: ChangeDetectorRef, private toastr: ToastrService) {
    super(service, {}, cd, router);
  }

  async checkUser() {
    await this.login();
  }

  login() {
    this.spinner.show();
    this.auth.login(this.user).pipe(first()).subscribe((data: any) => {
      if (data.success == 'true') {
        this.router.navigate(['/pages/dashboard']);
        // this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    },
      error => {
        this.spinner.hide();
      });
  }
}