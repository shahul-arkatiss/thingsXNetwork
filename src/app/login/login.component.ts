import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  imagePath = '../../assets/images/';

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private snack: MatSnackBar,
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        // Validators.pattern(
        //   /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/
        // ),
      ]),
    });
  }

  login() {
    // var encodedData = window.btoa(this.loginForm.value.password);
    const encodedData = window.btoa(this.loginForm.value.password);
    // const body = {
    //   LDAP_USER: this.loginForm.value.username,
    //   LDAP_PASSWORD: encodedData,
    // };

    const body = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.spinner.show();

    // if (this.loginForm.valid) {
      this.service.login(body).subscribe(
        (res) => {
          this.spinner.hide();
          if (res.status == "success") {
            this.router.navigateByUrl('/newSetup');
            console.log('loginResTrue:', res);
            sessionStorage.setItem('access_token', res.data.access_token);
            sessionStorage.setItem('company_id', res.data.company_id);
            sessionStorage.setItem('refresh_token', res.data.refresh_token);
            sessionStorage.setItem('user_id', res.data.user_id);
            sessionStorage.setItem('email', res.data.email);
            sessionStorage.setItem('address', res.data.address);
            sessionStorage.setItem('company_name', res.data.company_name);
            sessionStorage.setItem('full_name', res.data.email);
            sessionStorage.setItem('telephone', res.data.telephone);
          } else {
            this.snack.open(res.msg, 'Ok', { duration: 3000 });
          }
        },
        (err) => {
          this.spinner.hide();

          this.snack.open(err, 'Ok', { duration: 3000 });
        }
      );
    // } else {
    //   this.spinner.hide();
    // }
  }
}
