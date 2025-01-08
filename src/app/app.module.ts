import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/share.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MarkdownModule } from 'ngx-markdown';
import { AgGridAngular } from 'ag-grid-angular';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { ReactiveFormsModule } from '@angular/forms';

import { MatBadgeModule } from '@angular/material/badge';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { MatExpansionModule } from '@angular/material/expansion';
// import { GojsAngularModule } from 'gojs-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MatRadioModule } from '@angular/material/radio';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { StepsModule } from 'primeng/steps';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from 'primeng/dialog';
// import { FullCalendarModule } from '@fullcalendar/angular';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartModule } from 'primeng/chart';
import { DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

// import { CronEditorModule } from 'ngx-cron-editor';
import { ChipModule } from 'primeng/chip';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MatRippleModule } from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

import { HeaderComponent } from './header/header.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SetupComponent } from './setup/setup.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { FloorPlannerComponent } from './floor-planner/floor-planner.component';
import { D3MultiTreeComponent } from './d3-multi-tree/d3-multi-tree.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
import { LayoutDesignComponent } from './layout-design/layout-design.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LandingpageComponent, LoginComponent, SetupComponent, ConfigurationsComponent, FloorPlannerComponent, D3MultiTreeComponent, WarehouseDetailsComponent, LayoutDesignComponent, DashboardComponent, SignupComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    AgGridAngular,
    MatSelectModule,
    NgApexchartsModule,
    MarkdownModule,
    ChipModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    InputTextModule,
    DragDropModule,
    InputGroupModule,
    InputGroupAddonModule,
    MatBadgeModule,
    AutoCompleteModule,
    CheckboxModule,
    MatAutocompleteModule,
    ButtonModule,
    MatMenuModule,
    MatButtonToggleModule, TableModule, TreeTableModule, MatExpansionModule,
    MatDialogModule,DropdownModule,MatRadioModule,StepsModule,MatInputModule,MatFormFieldModule,MatStepperModule,
    MatRippleModule,DatePipe,ConfirmDialogModule,MultiSelectModule,ToastModule,
OverlayPanelModule,ChartModule,ContextMenuModule,SliderModule,CalendarModule,AccordionModule,

  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
