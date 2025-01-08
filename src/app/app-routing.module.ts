import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SetupComponent } from './setup/setup.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'signUp',
    component: SignupComponent,
  },
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: LandingpageComponent,
      },{
        path: 'newSetup',
        component: LandingpageComponent,
      },
      {
        path: 'setup',
        component: SetupComponent,
      },
      {
        path: 'configuration',
        component: ConfigurationsComponent,
      },
      {
        path: 'warehouseDetails',
        component: WarehouseDetailsComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
