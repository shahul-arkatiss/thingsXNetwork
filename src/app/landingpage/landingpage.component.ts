import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
  imagePath = '../../assets/images/';

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private snack: MatSnackBar
  ) {}

  getStarted(){
    this.router.navigateByUrl('/setup');

  }

}
