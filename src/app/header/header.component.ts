import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import { environment } from 'src/environments/environment.development';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
// import { ApiService } from '../services/api.service';
// import { HelperService } from '../helper/helper.service';
// import { UtilService } from '../helper/util.service';
// import { HomeService } from '../services/home.service';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Output() menuItem = new EventEmitter();
  @Input() backButtonClick!: () => void;

  title = 'AngularApp';
  cities: City[] | undefined;
  selectedCity: City | undefined;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = false;
  isLinear = true;
  DataFlow: any[];
  menuList: any[] = [{
    name: "home",
    link: ""

  }, {
    name: "home",
    link: ""
  }];
  subMenuList: any[] = [];
  menuListData: any[] = []
  dataFlow1!: MenuItem[];
  items: MenuItem[] | undefined;
  activeIndex: number = 0;
  activeMenu: any = 'home';
  imagePath = '../../assets/images/';

  constructor(
    private _formBuilder: FormBuilder,
    public router: Router,
    // private as: ApiService,
    // private helper: HelperService,
    // private util:UtilService,
    // private home:HomeService
  ) {
    // const token = this.util.getUserToken();
    // console.log(token, token?.session_id);
    // if (token) {
    //     console.log(token)
    //    this.menuList = token?.menuAuthorization?.result?.auth_objects;
    //   this.as.getHeaderMenus().subscribe((res: any) => {
    //     console.log(res);
    //     //this.menuList = res?.body?.menuAuthorization?.result?.auth_objects
    //       this.subMenuList = res?.body?.[token?.menuAuthorization?.result?.roles?.[0]?.role];
    //     // this.menuList = res?.body?.['global_admin'];

    //     console.log(this.menuList);
    //     console.log(this.subMenuList);
    //   });
    // }
    this.DataFlow = [
      { label: 'Create Flow', value: 'Create Flow' },
      { label: 'View Flows', value: 'View Flows' },
    ];
    // this.menuList = [
    //   { label: 'Home', value: 'home' },
    //   { label: 'Dashboard', value: 'dashboard' },
    //   { label: 'Security' , value:'security'},
    //   { label: 'Repositories', value: 'repositories' },
    //   { label: 'Interfaces', value: 'interfaces' },
    //   { label: 'Monitoring', value: 'monitoring' },
    //   { label: 'Comparison', value: 'comparison' },
    //   // { label: 'Migrations', value: 'migrations' },
    //   { label: 'Distribution', value: 'distribution' },
    //   { label: 'Cache', value: 'cache' },
    //   { label: 'Reports', value: 'report' }
    // ];
    this.menuListData = [
      { label: 'Home', value: 'home' },
      { label: 'About us', value: 'aboutus' },
      { label: 'Privacy Policy', value: 'privacypolicy' },
      { label: 'Contact Us', value: 'contactus' },
    ];
  }

  ngOnInit(): void {
    // const token = this.util.getUserToken()
    //   console.log(token,token?.session_id)
    //   this.as.selectedMenu$.subscribe((menu: any) => {
    //     if (menu) {
    //       this.menuNavigate(menu);
    //     } else {
    //       this.menuNavigate('home');
    //     }
    //   });
    sessionStorage.setItem('activeMenu', this.activeMenu);
    console.log('ngonit selectedMenu---', this.activeMenu);
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  selectedVal = "Home"

  onValChange(val: string) {
    this.selectedVal = val
    console.log(this.selectedVal)
    if (val == "Home") {
      this.router.navigate(['/dashboard']);

    } else if (val == "Configurations") {
      this.router.navigate(['/configuration']);
    }
  }

  goToNotifications(): void {
    this.router.navigate(['/preferences']);
  }
  menuNavigate(e: any, data?: any) {
    console.log(e, data)
    this.subMenuList.map((menu: any) => {

    })

    console.log(e, data);
    this.activeMenu = e;
    // this.home.setSelectedMenu(e);
    // this.menuItem.emit(e);
    sessionStorage.setItem('activeMenu', this.activeMenu);
    //this.router.navigate(['/' + e]);
    this.router.navigate([e]);
    if (e === 'interfaces') {
      // this.helper.updateSelectionTgl('list');
    }

  }
  subscriptions() {
    this.subMenuList.map((menu: any) => {
      if (menu.name === 'Subscription') {
        // this.util.setMenuData(menu);
        console.log(menu)
      }
    })
    this.activeMenu = 'subscription'
    sessionStorage.setItem('activeMenu', 'subscription')
  }
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
    window.location.reload();

  }
  // triggerBackAction() {
  //   if (this.backButtonClick) {
  //     this.backButtonClick(); // Trigger the action when backButtonClick is emitted
  //   }
  // }
}
